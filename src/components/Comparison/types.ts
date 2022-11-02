export type ComparisonCluster = {
    id: string;
    title: string;
    definition: string;
    props: ComparisonProperty[];
};

export type ComparisonProperty = {
    id: string;
    title: string;
    values: Record<string, string | number | undefined>
}