import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EyeOff, Trash2Icon } from "lucide-react";

interface AlertPrivateKeyVisibleProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setFullPrivateKeyVisible: (fullPrivateKeyVisible: boolean) => void;
}

export default function AlertPrivateKeyVisible({
  showModal,
  setShowModal,
  setFullPrivateKeyVisible,
}: AlertPrivateKeyVisibleProps) {
  return (
    <AlertDialog open={showModal}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="destructive">Show Private Key</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            {/* <Trash2Icon /> */}
            <EyeOff />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will show your private key in UI, it's recommended to copy
            only. It has been copied to your clipboard already
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              setShowModal(false);
              setFullPrivateKeyVisible(true);
            }}
          >
            Show
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
