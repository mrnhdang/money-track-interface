import Header from '../../components/fragment/Header';

export default function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div
        style={{
          paddingTop: '56px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
