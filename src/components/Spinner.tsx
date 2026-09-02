export default function Spinner({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-block animate-dojo-spin rounded-full"
      style={{
        width: size,
        height: size,
        border: "2px solid var(--dojo-border2)",
        borderTopColor: "var(--dojo-accent)",
      }}
    />
  );
}
