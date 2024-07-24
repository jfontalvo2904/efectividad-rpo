export enum VacancyState {
    Abierta = 'Abierta',
    Cubierta = 'Cubierta',
    Cancelada = 'Cancelada',
}

export default interface Vacancy {
    id: number,
    clientId: number,
    name: string,
    availablePositions: number,
    dateAssignment : string,
    state: VacancyState,
    observations:string
}