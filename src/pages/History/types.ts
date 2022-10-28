export type HistoryFromAPI = HistoryAPILine[];

export type HistoryAPILine = {
    histories: {
        dateTimeChange: string;
        propertyName: string;
        valueOld: string | null;
        valueNew: string | null;
        sourceOfChangeName: string;
    }[];
};

export type HistoryLine = {
    changeDate: Date;
    property: string;
    oldValue: string;
    newValue: string;
    changeReason: string;
}