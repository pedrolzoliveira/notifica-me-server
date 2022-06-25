export type Customer = {
    type: "individual" | "company",
    document: string;
    name: string;
}