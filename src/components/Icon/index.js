const Icon = props => (
  <span class={`icon-wrapper${(props.class && " " + props.class) || ""}`}>
    <svg class="icon">
      <use xlinkHref={`#icon-${props.name}`} />
    </svg>
  </span>
);

export default Icon;
