import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../hooks/useCarrinho";
import { usePagamento } from "../hooks/usePagamento";
import { normalizarNumeroCartao } from "../utils/pagamento";
import ResumoCompra from "../components/organisms/ResumoCompra";
import estilos from "./paginas.module.css";

// RF10 — Mesmas regras do Mini-Projeto.
const esquemaPagamento = z.object({
  titular: z.string().trim().min(1, "Informe o nome do titular impresso no cartão."),
  numeroCartao: z
    .string()
    .min(1, "Informe o número do cartão.")
    .transform((valor) => normalizarNumeroCartao(valor))
    .refine((valor) => /^\d{16}$/.test(valor), { message: "O número do cartão deve ter 16 dígitos." }),
  validade: z
    .string()
    .trim()
    .min(1, "Informe a validade do cartão.")
    .refine((valor) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(valor), {
      message: "Use o formato MM/AA, com mês entre 01 e 12.",
    }),
  cvv: z
    .string()
    .trim()
    .min(1, "Informe o código de segurança.")
    .refine((valor) => /^\d{3}$/.test(valor), { message: "O CVV deve ter exatamente 3 dígitos." }),
});

const CAMPOS = [
  { nome: "titular", rotulo: "Nome do titular", autoComplete: "cc-name" },
  { nome: "numeroCartao", rotulo: "Número do cartão", autoComplete: "cc-number", placeholder: "0000 0000 0000 0000", numerico: true },
  { nome: "validade", rotulo: "Validade", autoComplete: "cc-exp", placeholder: "MM/AA" },
  { nome: "cvv", rotulo: "CVV", autoComplete: "cc-csc", placeholder: "000", numerico: true },
];

function Pagamento() {
  const navigate = useNavigate();
  const { valorTotal } = useCarrinho();
  const { processando, processarCompra } = usePagamento();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquemaPagamento),
    defaultValues: { titular: "", numeroCartao: "", validade: "", cvv: "" },
  });

  // RF11/RF13 — O carrinho é limpo na tela /sucesso (limpar aqui acionaria a
  // rota privada e redirecionaria para /carrinho antes do navigate).
  const aoConfirmar = async (dados) => {
    const resultado = await processarCompra(dados.numeroCartao);
    navigate(resultado === "sucesso" ? "/sucesso" : "/falha");
  };

  return (
    <section className={estilos.estreita}>
      <h1>Pagamento</h1>
      <ResumoCompra total={valorTotal} />

      <form className={estilos.formulario} onSubmit={handleSubmit(aoConfirmar)} noValidate>
        {CAMPOS.map((campo) => (
          <div className={estilos.campo} key={campo.nome}>
            <label htmlFor={campo.nome}>{campo.rotulo}</label>
            <input
              id={campo.nome}
              type="text"
              inputMode={campo.numerico ? "numeric" : undefined}
              placeholder={campo.placeholder}
              autoComplete={campo.autoComplete}
              aria-invalid={Boolean(errors[campo.nome])}
              aria-describedby={errors[campo.nome] ? `erro-${campo.nome}` : undefined}
              disabled={processando}
              {...register(campo.nome)}
            />
            {errors[campo.nome] && (
              <p id={`erro-${campo.nome}`} className={estilos.erroCampo} role="alert">
                {errors[campo.nome].message}
              </p>
            )}
          </div>
        ))}

        <button type="submit" className={estilos.botaoEnviar} disabled={processando} aria-busy={processando}>
          {processando ? "Processando compra..." : "Confirmar pagamento"}
        </button>
      </form>
    </section>
  );
}

export default Pagamento;
