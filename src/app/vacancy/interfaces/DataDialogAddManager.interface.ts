import SelectData from "../../shared/interfaces/SelectData.interface"
export default interface DataDialogAddManager {
    title :string,
    selectEmpleadoData: SelectData[],
    selectCargoData: SelectData[]
}