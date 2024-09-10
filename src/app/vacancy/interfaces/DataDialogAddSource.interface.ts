import SelectData from "../../shared/interfaces/SelectData.interface";
import Source from './Source.interface';

export default interface DataDialogAddSource {
    title:string,
    source: Source,
    sources: SelectData[]
}