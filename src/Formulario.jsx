import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    cpf: "",
    telefoneFixo: "",
    celular: "",
    nomePai: "",
    nomeMae: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    cpf: "",
    telefoneFixo: "",
    celular: "",
    nomePai: "",
    nomeMae: "",
    cep: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [isMinor, setIsMinor] = useState(false);

  // Atualiza o estado conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validação do Nome Completo: não vazio e com pelo menos dois nomes
  const validateNomeCompleto = (value) => {
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        nomeCompleto: "Nome completo é obrigatório",
      }));
      return false;
    }
    const parts = value.trim().split(" ");
    if (parts.length < 2) {
      setErrors((prev) => ({
        ...prev,
        nomeCompleto: "Digite pelo menos nome e sobrenome",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, nomeCompleto: "" }));
    return true;
  };

  // Validação do CPF com remoção de máscara e verificação dos dígitos
  const validateCPF = (value) => {
    const cpf = value.replace(/\D/g, "");
    if (cpf.length !== 11) {
      setErrors((prev) => ({ ...prev, cpf: "CPF deve conter 11 dígitos" }));
      return false;
    }
    if (/^(\d)\1+$/.test(cpf)) {
      setErrors((prev) => ({ ...prev, cpf: "CPF inválido" }));
      return false;
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstCheck = (sum * 10) % 11;
    if (firstCheck === 10 || firstCheck === 11) firstCheck = 0;
    if (firstCheck !== parseInt(cpf.charAt(9))) {
      setErrors((prev) => ({ ...prev, cpf: "CPF inválido" }));
      return false;
    }
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondCheck = (sum * 10) % 11;
    if (secondCheck === 10 || secondCheck === 11) secondCheck = 0;
    if (secondCheck !== parseInt(cpf.charAt(10))) {
      setErrors((prev) => ({ ...prev, cpf: "CPF inválido" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, cpf: "" }));
    return true;
  };

  // Validação do Telefone Fixo (ex.: (11) 2345-6789)
  const validateTelefoneFixo = (value) => {
    const regex = /^\(\d{2}\)\s?\d{4}-\d{4}$/;
    if (!regex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        telefoneFixo: "Telefone fixo deve estar no formato (11) 2345-6789",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, telefoneFixo: "" }));
    return true;
  };

  // Validação do Celular (ex.: (11) 91234-5678)
  const validateCelular = (value) => {
    const regex = /^\(\d{2}\)\s?\d{5}-\d{4}$/;
    if (!regex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        celular: "Celular deve estar no formato (11) 91234-5678",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, celular: "" }));
    return true;
  };

  // Validação do CEP (aceita XXXXX-XXX ou 8 dígitos)
  const validateCEP = (value) => {
    const regex = /^(\d{5}-\d{3}|\d{8})$/;
    if (!regex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        cep: "CEP deve estar no formato 12345-678 ou 12345678",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, cep: "" }));
    return true;
  };

  // Validação do Email
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Email inválido" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  // Validação da Senha (mínimo 8 caracteres e critérios de complexidade)
  const validateSenha = (value) => {
    if (value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        senha: "A senha deve ter no mínimo 8 caracteres",
      }));
      return false;
    }
    const uppercase = /[A-Z]/.test(value);
    const lowercase = /[a-z]/.test(value);
    const number = /[0-9]/.test(value);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (!uppercase || !lowercase || !number || !specialChar) {
      setErrors((prev) => ({
        ...prev,
        senha:
          "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, senha: "" }));
    return true;
  };

  // Validação da confirmação da senha
  const validateConfirmarSenha = (value) => {
    if (value !== formData.senha) {
      setErrors((prev) => ({
        ...prev,
        confirmarSenha: "As senhas não correspondem",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, confirmarSenha: "" }));
    return true;
  };

  // Validação para Nome do Pai (obrigatório para menores de 18)
  const validateNomePai = (value) => {
    if (isMinor && !value.trim()) {
      setErrors((prev) => ({
        ...prev,
        nomePai: "Nome do Pai é obrigatório para menores de 18 anos",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, nomePai: "" }));
    return true;
  };

  // Validação para Nome da Mãe (obrigatório para menores de 18)
  const validateNomeMae = (value) => {
    if (isMinor && !value.trim()) {
      setErrors((prev) => ({
        ...prev,
        nomeMae: "Nome da Mãe é obrigatório para menores de 18 anos",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, nomeMae: "" }));
    return true;
  };

  // useEffect para calcular a idade e definir se o usuário é menor de 18
  useEffect(() => {
    if (formData.dataNascimento) {
      const birthDate = new Date(formData.dataNascimento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setIsMinor(age < 18);
      if (isNaN(birthDate.getTime())) {
        setErrors((prev) => ({ ...prev, dataNascimento: "Data inválida" }));
      } else {
        setErrors((prev) => ({ ...prev, dataNascimento: "" }));
      }
    }
  }, [formData.dataNascimento]);

  // Função para submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const validNome = validateNomeCompleto(formData.nomeCompleto);
    const validData =
      formData.dataNascimento !== "" &&
      !isNaN(new Date(formData.dataNascimento).getTime());
    if (!validData) {
      setErrors((prev) => ({
        ...prev,
        dataNascimento: "Data de nascimento inválida",
      }));
    }
    const validCPF = validateCPF(formData.cpf);
    const validTelefone = validateTelefoneFixo(formData.telefoneFixo);
    const validCelular = validateCelular(formData.celular);
    const validCEP = validateCEP(formData.cep);
    const validEmail = validateEmail(formData.email);
    const validSenha = validateSenha(formData.senha);
    const validConfirmar = validateConfirmarSenha(formData.confirmarSenha);
    const validNomePai = validateNomePai(formData.nomePai);
    const validNomeMae = validateNomeMae(formData.nomeMae);

    if (
      validNome &&
      validData &&
      validCPF &&
      validTelefone &&
      validCelular &&
      validCEP &&
      validEmail &&
      validSenha &&
      validConfirmar &&
      validNomePai &&
      validNomeMae
    ) {
      alert("Formulário enviado com sucesso!");
      console.log(formData);
    } else {
      alert("Por favor, corrija os erros no formulário.");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Formulário de Cadastro</h1>
      <form onSubmit={handleSubmit}>
        {/* Seção de Informações Pessoais */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            Informações Pessoais
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Nome Completo:</label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={(e) => {
                  handleChange(e);
                  validateNomeCompleto(e.target.value);
                }}
                className={`form-control ${
                  errors.nomeCompleto ? "is-invalid" : ""
                }`}
              />
              {errors.nomeCompleto && (
                <div className="invalid-feedback">{errors.nomeCompleto}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Data de Nascimento:</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                className={`form-control ${
                  errors.dataNascimento ? "is-invalid" : ""
                }`}
              />
              {errors.dataNascimento && (
                <div className="invalid-feedback">{errors.dataNascimento}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">CPF:</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={(e) => {
                  handleChange(e);
                  validateCPF(e.target.value);
                }}
                placeholder="XXX.XXX.XXX-XX ou apenas números"
                className={`form-control ${errors.cpf ? "is-invalid" : ""}`}
              />
              {errors.cpf && (
                <div className="invalid-feedback">{errors.cpf}</div>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Telefone Fixo:</label>
                <input
                  type="text"
                  name="telefoneFixo"
                  value={formData.telefoneFixo}
                  onChange={(e) => {
                    handleChange(e);
                    validateTelefoneFixo(e.target.value);
                  }}
                  placeholder="(11) 2345-6789"
                  className={`form-control ${
                    errors.telefoneFixo ? "is-invalid" : ""
                  }`}
                />
                {errors.telefoneFixo && (
                  <div className="invalid-feedback">{errors.telefoneFixo}</div>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Celular:</label>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={(e) => {
                    handleChange(e);
                    validateCelular(e.target.value);
                  }}
                  placeholder="(11) 91234-5678"
                  className={`form-control ${
                    errors.celular ? "is-invalid" : ""
                  }`}
                />
                {errors.celular && (
                  <div className="invalid-feedback">{errors.celular}</div>
                )}
              </div>
            </div>
            {isMinor && (
              <div className="card mt-4">
                <div className="card-header bg-secondary text-white">
                  Informações Complementares (Menores de 18 anos)
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Nome do Pai:</label>
                    <input
                      type="text"
                      name="nomePai"
                      value={formData.nomePai}
                      onChange={(e) => {
                        handleChange(e);
                        validateNomePai(e.target.value);
                      }}
                      className={`form-control ${
                        errors.nomePai ? "is-invalid" : ""
                      }`}
                    />
                    {errors.nomePai && (
                      <div className="invalid-feedback">{errors.nomePai}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nome da Mãe:</label>
                    <input
                      type="text"
                      name="nomeMae"
                      value={formData.nomeMae}
                      onChange={(e) => {
                        handleChange(e);
                        validateNomeMae(e.target.value);
                      }}
                      className={`form-control ${
                        errors.nomeMae ? "is-invalid" : ""
                      }`}
                    />
                    {errors.nomeMae && (
                      <div className="invalid-feedback">{errors.nomeMae}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Seção de Endereço */}
        <div className="card mb-4">
          <div className="card-header bg-success text-white">Endereço</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">CEP:</label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={(e) => {
                  handleChange(e);
                  validateCEP(e.target.value);
                }}
                placeholder="XXXXX-XXX ou 8 dígitos"
                className={`form-control ${errors.cep ? "is-invalid" : ""}`}
              />
              {errors.cep && (
                <div className="invalid-feedback">{errors.cep}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Endereço:</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Número:</label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-8 mb-3">
                <label className="form-label">Complemento (opcional):</label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Cidade:</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Estado:</label>
                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Seção de Informações da Conta */}
        <div className="card mb-4">
          <div className="card-header bg-info text-white">
            Informações da Conta
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                  validateEmail(e.target.value);
                }}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Senha:</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={(e) => {
                    handleChange(e);
                    validateSenha(e.target.value);
                  }}
                  className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                />
                {errors.senha && (
                  <div className="invalid-feedback">{errors.senha}</div>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Confirmar Senha:</label>
                <input
                  type="password"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={(e) => {
                    handleChange(e);
                    validateConfirmarSenha(e.target.value);
                  }}
                  className={`form-control ${
                    errors.confirmarSenha ? "is-invalid" : ""
                  }`}
                />
                {errors.confirmarSenha && (
                  <div className="invalid-feedback">
                    {errors.confirmarSenha}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
