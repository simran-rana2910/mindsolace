import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
import re
import os

def markdown_to_docx(md_filepath, docx_filepath):
    doc = docx.Document()

    # Page Margins (1 inch)
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Base Style Settings (Times New Roman, 12pt)
    normal_style = doc.styles['Normal']
    normal_font = normal_style.font
    normal_font.name = 'Times New Roman'
    normal_font.size = Pt(12)
    normal_font.color.rgb = RGBColor(0, 0, 0)

    with open(md_filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_table = False
    table_rows = []

    for line in lines:
        line_str = line.strip()

        # Handle Tables
        if line_str.startswith('|'):
            if '---' in line_str:
                continue # Skip table divider
            in_table = True
            cells = [c.strip() for c in line_str.split('|')[1:-1]]
            table_rows.append(cells)
            continue
        elif in_table:
            # End of table, render table to docx
            if table_rows:
                cols_count = max(len(r) for r in table_rows)
                tbl = doc.add_table(rows=len(table_rows), cols=cols_count)
                tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
                tbl.style = 'Table Grid'
                
                for r_idx, row in enumerate(table_rows):
                    for c_idx, val in enumerate(row):
                        if c_idx < cols_count:
                            cell = tbl.cell(r_idx, c_idx)
                            cell.text = val
                            if r_idx == 0:
                                for p in cell.paragraphs:
                                    for run in p.runs:
                                        run.font.bold = True
                                        run.font.name = 'Times New Roman'
                                        run.font.size = Pt(11)
            in_table = False
            table_rows = []

        if not line_str:
            continue

        # Headings
        if line_str.startswith('# '):
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p.add_run(line_str[2:].replace('**', ''))
            run.font.bold = True
            run.font.size = Pt(18)
            run.font.name = 'Times New Roman'
            run.font.color.rgb = RGBColor(30, 41, 59)
        elif line_str.startswith('## '):
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(12)
            p.paragraph_format.space_after = Pt(4)
            run = p.add_run(line_str[3:].replace('**', ''))
            run.font.bold = True
            run.font.size = Pt(15)
            run.font.name = 'Times New Roman'
            run.font.color.rgb = RGBColor(99, 102, 241)
        elif line_str.startswith('### '):
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(8)
            p.paragraph_format.space_after = Pt(2)
            run = p.add_run(line_str[4:].replace('**', ''))
            run.font.bold = True
            run.font.size = Pt(13)
            run.font.name = 'Times New Roman'
        elif line_str.startswith('#### '):
            p = doc.add_paragraph()
            run = p.add_run(line_str[5:].replace('**', ''))
            run.font.bold = True
            run.font.size = Pt(12)
            run.font.name = 'Times New Roman'
        elif line_str.startswith('* ') or line_str.startswith('- '):
            p = doc.add_paragraph(style='List Bullet')
            text = line_str[2:]
            parse_inline_formatting(p, text)
        elif line_str.startswith('```'):
            continue
        else:
            p = doc.add_paragraph()
            parse_inline_formatting(p, line_str)

    doc.save(docx_filepath)
    print(f"Successfully generated: {docx_filepath}")

def parse_inline_formatting(paragraph, text):
    parts = re.split(r'(\*\*.*?\*\*|\*.*?\*|`.*?`)', text)
    for part in parts:
        if not part:
            continue
        if part.startswith('**') and part.endswith('**'):
            run = paragraph.add_run(part[2:-2])
            run.font.bold = True
        elif part.startswith('*') and part.endswith('*'):
            run = paragraph.add_run(part[1:-1])
            run.font.italic = True
        elif part.startswith('`') and part.endswith('`'):
            run = paragraph.add_run(part[1:-1])
            run.font.name = 'Courier New'
            run.font.size = Pt(10.5)
        else:
            run = paragraph.add_run(part)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.abspath(__file__))
    markdown_to_docx(os.path.join(base_dir, "MindSolace_SRS_Synopsis.md"), os.path.join(base_dir, "MindSolace_SRS_Synopsis.docx"))
    markdown_to_docx(os.path.join(base_dir, "MindSolace_Minor_Project_Report.md"), os.path.join(base_dir, "MindSolace_Minor_Project_Report.docx"))
    markdown_to_docx(os.path.join(base_dir, "MindSolace_Technical_Architecture_and_Working.md"), os.path.join(base_dir, "MindSolace_Technical_Architecture_and_Working.docx"))
