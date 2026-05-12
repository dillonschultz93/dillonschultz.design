import { readFile } from "fs/promises";
import { join } from "path";

export const loader = async () => {
  const filePath = join(process.cwd(), "app", "assets", "dillon-schultz-resume.pdf");
  const file = await readFile(filePath);

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="dillon-schultz-resume.pdf"',
    },
  });
};
