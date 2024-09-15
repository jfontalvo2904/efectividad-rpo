import SelectData from "../../shared/interfaces/SelectData.interface";
import Sector from "../interfaces/Sector.interface";
import Source from "../interfaces/Source.interface";
import SourceKeys from "../interfaces/SourceKeys.enum";
import SourceKeysOriginal from "../interfaces/SourceKeysOriginal.enum";
import SourceTableFormat from "../interfaces/SourceTableFormat.interface";
import SupportStaffByClientResponse from "../interfaces/SupportStaffByClientResponse";
import VacancyStatus from "../interfaces/VacancyStatus.interface";
import VacancyType from "../interfaces/VacancyType.interface";

export default class VacancyUtils {

    static selectSector( sectors: Sector[]): SelectData[] {
        return sectors.map( sector => ({viewValue: sector.name, value: sector.id}));
    }

    static selectVacancyType(types: VacancyType[]): SelectData[] {
        return types.map( type => ({value: type.id, viewValue: type.name}))
    }

    static selectVacancyStatus(status: VacancyStatus[]): SelectData[]{
        return status.map( state => ({viewValue: state.name, value:state.id} ));
    }

    static selectSupportStaffByClientResponse(supports: SupportStaffByClientResponse[]) {
        return supports.map( support => ({viewValue: support.user_name, value:support.user} ));
    }

    static selectSources(source:Source):SelectData[] {
        return [
            {
                viewValue: SourceKeys.busqueda_avature,
                value: SourceKeysOriginal.busqueda_avature
            },
            {
                viewValue: SourceKeys.computrabajo,
                value: SourceKeysOriginal.computrabajo
            },
            {
                viewValue: SourceKeys.convocatoria,
                value: SourceKeysOriginal.convocatoria
            },
            {
                viewValue: SourceKeys.correo,
                value: SourceKeysOriginal.correo
            },
            {
                viewValue: SourceKeys.el_empleo,
                value: SourceKeysOriginal.el_empleo
            },
            {
                viewValue: SourceKeys.facebook,
                value: SourceKeysOriginal.facebook
            },
            {
                viewValue: SourceKeys.instagram,
                value: SourceKeysOriginal.instagram
            },
            {
                viewValue: SourceKeys.landing_page,
                value: SourceKeysOriginal.landing_page
            },
            {
                viewValue: SourceKeys.linkedIn,
                value: SourceKeysOriginal.linkedIn
            },
            {
                viewValue: SourceKeys.pandape,
                value: SourceKeysOriginal.pandape
            },
            {
                viewValue: SourceKeys.referido,
                value: SourceKeysOriginal.referido
            },
            {
                viewValue: SourceKeys.otros,
                value: SourceKeysOriginal.otros
            }
        ];
    }

    static sourceToSourceTableFormatList(sourceParam:Source):Source[]{

        return [
            sourceParam
        ]
    }

}
