export interface Customer {
    type: "individual" | "company",
    document: string;
    name: string;
}