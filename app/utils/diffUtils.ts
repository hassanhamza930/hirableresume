/**
 * Utility functions for handling diff-based content updates
 */

/**
 * Replaces specific sections of HTML content with new content
 * @param originalContent The original HTML content
 * @param replacements An array of objects containing the section to replace and the new content
 * @returns The updated HTML content
 */
export interface Replacement {
  oldContent: string;
  newContent: string;
}

export function replace(originalContent: string, replacements: Replacement[]): string {
  let updatedContent = originalContent;

  // Apply each replacement
  for (const { oldContent, newContent } of replacements) {
    // Escape special characters in oldContent for use in regex
    const escapedOldContent = oldContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regex to find the old content
    const regex = new RegExp(escapedOldContent, 'g');

    // Replace the old content with the new content
    updatedContent = updatedContent.replace(regex, newContent);
  }

  return updatedContent;
}

/**
 * Parses the AI response to extract replacements from <old></old> and <new></new> tags
 * @param aiResponse The response from the AI containing replacement instructions with tags
 * @returns An array of replacement objects
 */
export function parseReplacements(aiResponse: string): Replacement[] {
  try {
    const replacements: Replacement[] = [];

    // Split the response by lines to process each <old>/<new> pair
    const lines = aiResponse.split('\n');

    let currentOld = '';
    let collectingOld = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for opening <old> tag
      if (line.includes('<old>')) {
        collectingOld = true;
        currentOld = line.replace(/<old>/g, '');

        // Handle case where <old> and </old> are on the same line
        if (currentOld.includes('</old>')) {
          currentOld = currentOld.replace(/<\/old>/g, '');
          collectingOld = false;

          // Look for the corresponding <new> tag
          if (i + 1 < lines.length && lines[i + 1].includes('<new>')) {
            const newLine = lines[i + 1];
            const newContent = newLine.replace(/<new>/g, '').replace(/<\/new>/g, '');

            replacements.push({
              oldContent: currentOld,
              newContent: newContent
            });

            i++; // Skip the next line since we've processed it
          }
        }
      }
      // Continue collecting old content if we're in the middle of an <old> tag
      else if (collectingOld && !line.includes('</old>')) {
        currentOld += '\n' + line;
      }
      // End of old content
      else if (collectingOld && line.includes('</old>')) {
        currentOld += '\n' + line.replace(/<\/old>/g, '');
        collectingOld = false;

        // Look for the corresponding <new> tag
        let newContent = '';
        let collectingNew = false;

        if (i + 1 < lines.length && lines[i + 1].includes('<new>')) {
          collectingNew = true;
          newContent = lines[i + 1].replace(/<new>/g, '');
          i++;

          // Handle case where <new> and </new> are on the same line
          if (newContent.includes('</new>')) {
            newContent = newContent.replace(/<\/new>/g, '');
            collectingNew = false;

            replacements.push({
              oldContent: currentOld,
              newContent: newContent
            });
          }
          // Continue collecting new content
          else {
            while (i + 1 < lines.length && collectingNew) {
              i++;
              const newLine = lines[i];

              if (newLine.includes('</new>')) {
                newContent += '\n' + newLine.replace(/<\/new>/g, '');
                collectingNew = false;

                replacements.push({
                  oldContent: currentOld,
                  newContent: newContent
                });
              } else {
                newContent += '\n' + newLine;
              }
            }
          }
        }
      }
      // Handle case where <old> and <new> are on the same line (compressed format)
      else if (line.includes('<old>') && line.includes('</old>') && line.includes('<new>') && line.includes('</new>')) {
        const oldContent = line.substring(
          line.indexOf('<old>') + 5,
          line.indexOf('</old>')
        );

        const newContent = line.substring(
          line.indexOf('<new>') + 5,
          line.indexOf('</new>')
        );

        replacements.push({
          oldContent: oldContent,
          newContent: newContent
        });
      }
    }

    if (replacements.length === 0) {
      throw new Error('No valid replacements found in AI response');
    }

    return replacements;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    throw new Error('Failed to parse AI response for replacements');
  }
}
