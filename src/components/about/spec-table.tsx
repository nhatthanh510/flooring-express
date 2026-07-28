import { SectionHeading } from "@/components/shared/section-heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { specRows } from "@/lib/content/about";

export function SpecTable() {
  return (
    <section id="specifications" className="scroll-mt-24 bg-surface-low py-section">
      <div className="container-page">
        <SectionHeading
          title="Technical Excellence"
          description="We don't just guess — we install based on performance data."
        />

        <div className="zebra-rows mt-12 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="py-5 text-label-md uppercase text-primary-foreground">
                    Flooring Type
                  </TableHead>
                  <TableHead className="py-5 text-label-md uppercase text-primary-foreground">
                    Durability Rating
                  </TableHead>
                  <TableHead className="py-5 text-label-md uppercase text-primary-foreground">
                    Ideal For
                  </TableHead>
                  <TableHead className="py-5 text-label-md uppercase text-primary-foreground">
                    Standard Warranty
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specRows.map((row) => (
                  <TableRow key={row.type}>
                    <TableCell className="py-5 text-body-md font-semibold text-primary">
                      {row.type}
                    </TableCell>
                    <TableCell className="py-5 text-body-md text-muted-foreground">
                      {row.durability}
                    </TableCell>
                    <TableCell className="py-5 text-body-md text-muted-foreground">
                      {row.idealFor}
                    </TableCell>
                    <TableCell className="py-5 text-body-md font-medium text-secondary">
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
