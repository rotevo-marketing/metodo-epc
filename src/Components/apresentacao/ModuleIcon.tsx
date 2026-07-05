export function getIconPath(slug: string): string {
  if (slug === "resumo-estrategico") return "/icons/38-orientacoes.svg";
  if (slug.includes("dna-do-especialista")) return "/icons/01-especialista.svg";
  if (slug.includes("dna-da-empresa")) return "/icons/02-empresa.svg";
  if (slug.includes("dna-de-conteudo")) return "/icons/03-dna-conteudo.svg";
  if (slug.includes("tom-de-voz")) return "/icons/06-tom-de-voz.svg";
  if (slug.includes("identidade-visual")) return "/icons/07-identidade-visual.svg";
  if (slug.includes("objetivos")) return "/icons/08-objetivos.svg";
  if (slug.includes("referencias-e-concorrentes")) return "/icons/09-referencias-e-concorrentes.svg";
  if (slug.includes("pesquisa-de-concorrencia")) return "/icons/10-pesquisa-de-concorrencia.svg";
  if (slug.includes("analise-swot")) return "/icons/11-analise-swot.svg";
  if (slug.includes("palavras-chave")) return "/icons/12-palavras-chave.svg";
  if (slug.includes("personas")) return "/icons/13-personas.svg";
  if (slug.includes("jornada-de-compra")) return "/icons/14-jornada-de-compra.svg";
  if (slug.includes("canais-digitais-atuais")) return "/icons/15-canais-digitais.svg";
  if (slug.includes("funil")) return "/icons/16-funil-de-conteudo.svg";
  if (slug.includes("linhas-editoriais")) return "/icons/17-linhas-editoriais.svg";
  if (slug.includes("instagram")) return "/icons/18-instagram.svg";
  if (slug.includes("tiktok")) return "/icons/19-tik-tok.svg";
  if (slug.includes("youtube")) return "/icons/20-youtube.svg";
  if (slug.includes("facebook")) return "/icons/21-facebook.svg";
  if (slug.includes("linkedin")) return "/icons/22-linkedin.svg";
  if (slug.includes("whatsapp")) return "/icons/23-whatsaap.svg";
  if (slug.includes("blog")) return "/icons/24-blog.svg";
  if (slug.includes("pinterest")) return "/icons/25-pinterest.svg";
  if (slug.includes("podcasts")) return "/icons/26-podcast.svg";
  if (slug.includes("lives")) return "/icons/27-lives.svg";
  if (slug.includes("materiais-educacionais")) return "/icons/28-materiais-educacionais.svg";
  if (slug.includes("estrategia-do-site")) return "/icons/29-estrategia-do-site.svg";
  if (slug.includes("mapa-do-site")) return "/icons/30-mapa-do-site.svg";
  if (slug.includes("captacao-de-lead")) return "/icons/31-campanha-leads.svg";
  if (slug.includes("conversao-de-vendas")) return "/icons/32-campanha-vendas.svg";
  if (slug.includes("distribuicao-de-conteudo")) return "/icons/33-campanha-conteudo.svg";
  if (slug.includes("fluxo-de-automacao")) return "/icons/34-fluxo-de-automacao.svg";
  if (slug.includes("linha-do-tempo")) return "/icons/35-linha-do-tempo.svg";
  if (slug.includes("calendario-de-conteudo")) return "/icons/36-calendario-de-conteudo.svg";
  if (slug.includes("metricas-e-indicadores")) return "/icons/37-metricas-e-indicadores.svg";
  if (slug.includes("orientacoes")) return "/icons/38-orientacoes.svg";
  return "/icons/38-orientacoes.svg";
}

/**
 * Renders the icon circle used on module cards in the presentation grid.
 * Style is controlled by the global .rotevo-card-icon CSS class:
 *   - Normal: slate-100 background, slate-800 icon
 *   - Hover (requires parent with class="group"): black background, white icon
 */
export function ModuleCardIcon({ slug }: { slug: string }) {
  return (
    <div className="rotevo-card-icon">
      <ModuleIcon slug={slug} size="card" />
    </div>
  );
}

export function ModuleIcon({
  slug,
  size = "sm",
  inverted = false,
  hoverInvert = false,
  hoverDarken = false,
}: {
  slug: string;
  size?: "sm" | "card" | "lg";
  inverted?: boolean;
  hoverInvert?: boolean;
  hoverDarken?: boolean;
}) {
  const sizeClass = size === "lg" ? "h-10 w-10" : size === "card" ? "h-6 w-6" : "h-5 w-5";
  const textClass = inverted ? "text-white" : "";
  const hoverTextClass = hoverInvert
    ? "group-hover:text-white"
    : hoverDarken
    ? "group-hover:text-black"
    : "";
  const iconPath = getIconPath(slug);

  return (
    <div
      style={{
        maskImage: `url(${iconPath})`,
        WebkitMaskImage: `url(${iconPath})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
      className={`bg-current transition-colors ${sizeClass} ${textClass} ${hoverTextClass}`.trim()}
    />
  );
}
