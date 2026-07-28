import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { specRows } from "@/lib/content/about";

const columns = [
  "Flooring Type",
  "Durability Rating",
  "Ideal For",
  "Standard Warranty",
] as const;

export function SpecTable() {
  return (
    <section
      id="specifications"
      className="scroll-mt-24 bg-surface-low py-section"
    >
      <div className="container-page">
        {/* Left-aligned with no underline rule — this section's heading differs
            from the centred SectionHeading used elsewhere, per the mockup. */}
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="text-headline-lg-mobile text-primary md:text-headline-lg">
            Technical Excellence
          </h2>
          <p className="text-body-md text-muted-foreground">
            We don&rsquo;t just guess&mdash;we install based on performance
            data.
          </p>
        </div>

        <div className="zebra-rows overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-0 bg-primary hover:bg-primary">
                  {columns.map((column) => (
                    <TableHead
                      key={column}
                      className="h-auto p-4 text-body-md font-bold text-primary-foreground"
                    >
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {specRows.map((row) => (
                  <TableRow
                    key={row.type}
                    className="border-b-0 hover:bg-transparent"
                  >
                    <TableCell className="p-4 text-body-md font-bold text-foreground">
                      {row.type}
                    </TableCell>
                    <TableCell className="p-4 text-body-md text-foreground">
                      {row.durability}
                    </TableCell>
                    <TableCell className="p-4 text-body-md text-foreground">
                      {row.idealFor}
                    </TableCell>
                    <TableCell className="p-4 text-body-md text-foreground">
                      {row.warranty}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
