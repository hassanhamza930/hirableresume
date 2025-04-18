'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface CreateResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateResume: (jobDescription: string) => Promise<void>;
  isLoading?: boolean;
}

const CreateResumeModal: React.FC<CreateResumeModalProps> = ({
  isOpen,
  onClose,
  onCreateResume,
  isLoading = false
}) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      return;
    }

    try {
      await onCreateResume(jobDescription);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating resume:', error);
    }
  };

  const resetForm = () => {
    setJobDescription('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-zinc-950 border border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold" style={{ fontFamily: "Geist" }}>
            Create New Resume
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="job-description" className="text-white">
              Job Description
            </Label>
            <Textarea
              id="job-description"
              placeholder="Paste the job description here to tailor your resume..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="bg-zinc-900 border-white/10 text-white min-h-[250px]"
            />
            <p className="text-xs text-white/60">
              We'll use this information to tailor your resume for this specific job.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/20 text-white hover:bg-zinc-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!jobDescription.trim() || isLoading}
            className="bg-white text-black hover:bg-white/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Resume'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResumeModal;
