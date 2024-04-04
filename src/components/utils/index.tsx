"use client";

import {Dialog, Slide, DialogProps} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {ReactElement, Ref, forwardRef} from "react";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DialogContainer({children, open = false, ...props}: DialogProps) {
  return (
    <Dialog open={open} TransitionComponent={Transition} {...props}>
      {children}
    </Dialog>
  );
}
