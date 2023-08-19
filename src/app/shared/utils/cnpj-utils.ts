export function formatCnpj(cnpj: number): string {
    if (!cnpj) {
        return '';
    }
    const cnpjString = cnpj.toString().padStart(14, '0');
    return cnpjString.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function unformatCnpj(cnpjFormatted: string): string {
    return cnpjFormatted.replace(/\D/g, '');
}
