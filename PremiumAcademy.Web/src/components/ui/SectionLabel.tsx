export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="label flex items-center gap-4">
      <span className="font-display text-base normal-case tracking-normal text-brass">{index}</span>
      <span className="h-px w-10 bg-brass" aria-hidden="true" />
      {children}
    </p>
  );
}
