export function formatCpf(cpf: number): string {
    const cpfString = cpf.toString().padStart(11, '0');
    return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function unformatCpf(cpfFormatted: string): string {
    return cpfFormatted.replace(/\D/g, '');
}