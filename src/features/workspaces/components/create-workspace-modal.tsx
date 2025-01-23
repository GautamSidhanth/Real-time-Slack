import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useCreateWorkspace } from '../api/use-create-workspace';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const CreateWorkspaceModal = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useCreateWorkspaceModal();
    const [name, setName] = useState("");
    const { mutate, isPending } = useCreateWorkspace();

    const handleClose = () => {
        setIsOpen(false);
        setName("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        mutate({ name }, {
            onSuccess(id) {
                toast.success("Workspace created");
                router.push(`/workspace/${id}`);
                handleClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="Workspace name e.g. 'Work','Personal','Home'"
                    />
                    <div className="flex justify-end">
                        <Button disabled={isPending} type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};