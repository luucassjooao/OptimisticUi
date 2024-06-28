import { ThemeSwicher } from './ThemeSwicher';

export function Header() {
  return (
    <header className="flex items-center justify-between" >
      <div>
        <h1 className="font-bold text-3xl -tracking-wider" >TheUsers</h1>
        <span className="text-muted-foreground" >Gerencie o seus usúarios.</span>
      </div>

      <ThemeSwicher />
    </header>
  );
}
