export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
