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
  onCreateResume: (jobDescription: string) => void;
}

const CreateResumeModal: React.FC<CreateResumeModalProps> = ({
  isOpen,
  onClose,
  onCreateResume
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!jobDescription.trim()) {
      return;
    }

    setIsLoading(true);

    // In a real implementation, this would call the API to create a new resume
    setTimeout(() => {
      onCreateResume(jobDescription);
      setIsLoading(false);
      resetForm();
      onClose();
    }, 1000);
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
