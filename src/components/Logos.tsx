/**
 * Os logos oficiais do C e do C++, como SVG inline.
 *
 * Inline (e não <img src="...">) por dois motivos: não gera uma requisição por
 * ícone, e deixa as cores virem de variáveis CSS — o logo do C é um azul chapado
 * que praticamente some no tema escuro, então cada tema usa seu tom (ver
 * --dojo-logo-* no index.css).
 */

interface LogoProps {
  /** Lado do quadrado, em px. O desenho é proporcional. */
  size?: number;
  className?: string;
  /**
   * Nome acessível. Por padrão o logo é decorativo (aria-hidden): ele quase
   * sempre aparece ao lado de um texto que já diz a mesma coisa, e anunciar as
   * duas coisas faria o botão "C" virar "C C" no leitor de tela.
   */
  label?: string;
}

export function CppLogo({ size = 20, className, label }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 306 344.35"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path
        fill="var(--dojo-logo-cpp-right)"
        d="M302.107,258.262c2.401-4.159,3.893-8.845,3.893-13.053V99.14c0-4.208-1.49-8.893-3.892-13.052L153,172.175L302.107,258.262z"
      />
      <path
        fill="var(--dojo-logo-cpp-bottom)"
        d="M166.25,341.193l126.5-73.034c3.644-2.104,6.956-5.737,9.357-9.897L153,172.175L3.893,258.263c2.401,4.159,5.714,7.793,9.357,9.896l126.5,73.034C147.037,345.401,158.963,345.401,166.25,341.193z"
      />
      <path
        fill="var(--dojo-logo-cpp-top)"
        d="M302.108,86.087c-2.402-4.16-5.715-7.793-9.358-9.897L166.25,3.156c-7.287-4.208-19.213-4.208-26.5,0L13.25,76.19C5.962,80.397,0,90.725,0,99.14v146.069c0,4.208,1.491,8.894,3.893,13.053L153,172.175L302.108,86.087z"
      />
      <path
        fill="#FFFFFF"
        d="M153,274.175c-56.243,0-102-45.757-102-102s45.757-102,102-102c36.292,0,70.139,19.53,88.331,50.968l-44.143,25.544c-9.105-15.736-26.038-25.512-44.188-25.512c-28.122,0-51,22.878-51,51c0,28.121,22.878,51,51,51c18.152,0,35.085-9.776,44.191-25.515l44.143,25.543C223.142,254.644,189.294,274.175,153,274.175z"
      />
      <polygon
        fill="#FFFFFF"
        points="255,166.508 243.666,166.508 243.666,155.175 232.334,155.175 232.334,166.508 221,166.508 221,177.841 232.334,177.841 232.334,189.175 243.666,189.175 243.666,177.841 255,177.841"
      />
      <polygon
        fill="#FFFFFF"
        points="297.5,166.508 286.166,166.508 286.166,155.175 274.834,155.175 274.834,166.508 263.5,166.508 263.5,177.841 274.834,177.841 274.834,189.175 286.166,189.175 286.166,177.841 297.5,177.841"
      />
    </svg>
  );
}

export function CLogo({ size = 20, className, label }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path
        fill="var(--dojo-logo-c)"
        d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6l-48.3-27.8c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4v-55.8c.1-.8 0-1.7-.4-2.6zm-53.5 55c9.1 0 17.1-5 21.3-12.4l12.9 7.6c-6.8 11.8-19.6 19.8-34.2 19.8-21.8 0-39.5-17.7-39.5-39.5s17.7-39.5 39.5-39.5c14.7 0 27.5 8.1 34.3 20l-13 7.5c-4.2-7.5-12.2-12.5-21.3-12.5-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5z"
      />
    </svg>
  );
}

/** O logo da linguagem que estiver ativa. */
export function LanguageLogo({ language, size, className, label }: LogoProps & { language: "cpp" | "c" }) {
  return language === "c" ? (
    <CLogo size={size} className={className} label={label} />
  ) : (
    <CppLogo size={size} className={className} label={label} />
  );
}
