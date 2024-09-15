import { TooltipPosition } from "@angular/material/tooltip";

export default interface CustomTableAddButtonOptions {
    tooltipPosition?:TooltipPosition,
    tooltipDescription?: string,
    fontIcon?:string,
    description?:string,
    handleFunction:()=>void
}