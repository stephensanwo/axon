import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/Common/Dialog";
import { Button } from "../Common/Button";
import { PiMagnifyingGlass } from "react-icons/pi";
import SearchMain from "./SearchMain";

function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button
          variant="ghost"
          size="icon"
          disabled={false}
          aria-label="Axon Search"
        >
          <PiMagnifyingGlass />
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[35vh] max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Axon Search</DialogTitle>
        </DialogHeader>
        <DialogBody className="h-[600px]">
          <SearchMain />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
