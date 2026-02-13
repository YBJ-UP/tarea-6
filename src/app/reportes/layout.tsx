import Link from "next/link";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Link href={'/'}>
                <h1 className="text-xl font-bold px-10 py-2 bg-emerald-800">Regresar al dashboard</h1>
            </Link>
            {children}
        </div>
        
    );
}