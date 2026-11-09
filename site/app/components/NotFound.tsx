import { Blob } from "./Blob";
import { Button } from "./ui/Button";

export function NotFound() {
  return (
    <section className="notfound gutter">
      <Blob seed={3} className="notfound-blob" />
      <Blob seed={4} className="notfound-piece notfound-piece--a" />
      <Blob seed={5} className="notfound-piece notfound-piece--b" />
      <p className="display">{"¯\\_(ツ)_/¯"}</p>
      <h1 className="headline">404: Page not found</h1>
      <p className="subtle">The page you are looking for does not exist. It may have moved, or the blob wandered off with it.</p>
      <div className="actions">
        <Button href="/">Go home</Button>
        <Button href="/#work" variant="secondary">See my work</Button>
        <Button href="/blog" variant="secondary">Read my writing</Button>
      </div>
    </section>
  );
}
