const rules = {
  required: value => !!value || 'Este campo é obrigatório!',
  minLength: (value, length) => (value && value.length >= length) || `Este campo deve ter no mínimo ${length} caracteres!`,
  maxLength: (value, length) => (value && value.length <= length) || `Este campo deve ter no máximo ${length} caracteres!`,
  email: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Este campo deve ser um e-mail válido!',
  confirmPassword: password => value => value === password || 'As senhas não conferem!',
  cnpj: value => /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value) || 'CNPJ inválido!',
  phone: value => /^\(\d{2}\)\d{4,5}\-\d{4}$/.test(value) || 'Telefone inválido!',
  number: value => /^\d+$/.test(value) || 'Este campo deve ser numérico!',
  date: value => /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    .test(value) || 'Este campo deve ser uma data valida!',
}

export default rules
