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
} from "@/components/ui/alert-dialog";

interface AlertDialogModalProps {
  alertDialogTitle: string;
  alertDialogDescription: string;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  actionFunction: () => void;
  actionButtonName: string;
  cancelButtonName: string;
  icon: React.ReactNode;
}

export default function AlertDialogModal({
  showModal,
  setShowModal,
  actionFunction,
  actionButtonName,
  cancelButtonName,
  alertDialogTitle,
  alertDialogDescription,
  icon,
}: AlertDialogModalProps) {
  return (
    <AlertDialog open={showModal}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            {/* <Trash2Icon /> */}
            {icon}
          </AlertDialogMedia>
          <AlertDialogTitle>{alertDialogTitle} </AlertDialogTitle>
          <AlertDialogDescription>
            {alertDialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            onClick={() => setShowModal(false)}
          >
            {cancelButtonName}
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              setShowModal(false);
              actionFunction();
            }}
          >
            {actionButtonName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
