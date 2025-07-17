import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import path from 'path';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name = 'Student', course = 'Course' } = req.query;
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  // Paths to assets
  const imagePath = path.join(process.cwd(), 'public', 'certificate-template.jpg');
  const logoPath = path.join(process.cwd(), 'public', 'gyanbridge-logo.svg');
  let imageBytes: Buffer | null = null;
  let logoBytes: Buffer | null = null;
  try { imageBytes = fs.readFileSync(imagePath); } catch (e) { imageBytes = null; }
  try { logoBytes = fs.readFileSync(logoPath); } catch (e) { logoBytes = null; }

  // Create PDF
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 1200;
  const pageHeight = 900;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  // Draw background image if available
  if (imageBytes) {
    const jpgImage = await pdfDoc.embedJpg(imageBytes);
    page.drawImage(jpgImage, { x: 0, y: 0, width: pageWidth, height: pageHeight });
  } else {
    // fallback: light background
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: rgb(0.98, 0.98, 0.96) });
  }

  // Draw decorative borders
  // Outer gold border
  const borderMargin = 32;
  page.drawRectangle({
    x: borderMargin,
    y: borderMargin,
    width: pageWidth - 2 * borderMargin,
    height: pageHeight - 2 * borderMargin,
    borderColor: rgb(0.85, 0.65, 0.13), // gold
    borderWidth: 6,
    color: undefined,
    opacity: 1,
  });
  // Inner blue border
  const innerMargin = borderMargin + 18;
  page.drawRectangle({
    x: innerMargin,
    y: innerMargin,
    width: pageWidth - 2 * innerMargin,
    height: pageHeight - 2 * innerMargin,
    borderColor: rgb(0.13, 0.25, 0.45), // deep blue
    borderWidth: 3,
    color: undefined,
    opacity: 1,
  });

  // Fonts
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Draw Gyanbridge logo at top center
  if (logoBytes) {
    try {
      const logoImg = await pdfDoc.embedPng(logoBytes);
      const logoWidth = 120;
      const logoHeight = 120;
      page.drawImage(logoImg, {
        x: (pageWidth - logoWidth) / 2,
        y: pageHeight - logoHeight - 40,
        width: logoWidth,
        height: logoHeight,
      });
    } catch (e) { /* skip logo if error */ }
  }

  // Title
  const title = 'Certificate of Achievement';
  const titleFontSize = 44;
  const titleWidth = font.widthOfTextAtSize(title, titleFontSize);
  page.drawText(title, {
    x: (pageWidth - titleWidth) / 2,
    y: pageHeight - 200,
    size: titleFontSize,
    font,
    color: rgb(0.13, 0.25, 0.45), // deep blue
  });

  // Subtitle
  const subtitle = 'This certificate is proudly presented to';
  const subtitleFontSize = 24;
  const subtitleWidth = fontReg.widthOfTextAtSize(subtitle, subtitleFontSize);
  page.drawText(subtitle, {
    x: (pageWidth - subtitleWidth) / 2,
    y: pageHeight - 260,
    size: subtitleFontSize,
    font: fontReg,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Name
  const nameText = String(name);
  const nameFontSize = 40;
  const nameWidth = font.widthOfTextAtSize(nameText, nameFontSize);
  page.drawText(nameText, {
    x: (pageWidth - nameWidth) / 2,
    y: pageHeight - 320,
    size: nameFontSize,
    font,
    color: rgb(0.85, 0.65, 0.13), // gold
  });

  // For completing the course
  const courseLabel = 'For successfully completing the course:';
  const courseLabelFontSize = 22;
  const courseLabelWidth = fontReg.widthOfTextAtSize(courseLabel, courseLabelFontSize);
  page.drawText(courseLabel, {
    x: (pageWidth - courseLabelWidth) / 2,
    y: pageHeight - 370,
    size: courseLabelFontSize,
    font: fontReg,
    color: rgb(0.2, 0.2, 0.2),
  });
  const courseText = String(course);
  const courseFontSize = 30;
  const courseWidth = font.widthOfTextAtSize(courseText, courseFontSize);
  page.drawText(courseText, {
    x: (pageWidth - courseWidth) / 2,
    y: pageHeight - 410,
    size: courseFontSize,
    font,
    color: rgb(0.13, 0.25, 0.45), // deep blue
  });

  // Draw stylish, larger medal under course name
  const medalCenterX = pageWidth / 2;
  const medalCenterY = pageHeight - 550;
  const medalOuterRadius = 60;
  const medalInnerRadius = 48;
  // Gold outer ring
  page.drawEllipse({
    x: medalCenterX,
    y: medalCenterY,
    xScale: medalOuterRadius,
    yScale: medalOuterRadius,
    color: rgb(0.85, 0.65, 0.13),
    borderColor: rgb(0.7, 0.5, 0.1),
    borderWidth: 4,
  });
  // Blue inner circle
  page.drawEllipse({
    x: medalCenterX,
    y: medalCenterY,
    xScale: medalInnerRadius,
    yScale: medalInnerRadius,
    color: rgb(0.13, 0.25, 0.45),
    borderColor: rgb(0.85, 0.65, 0.13),
    borderWidth: 2,
  });
  // White star (5-point)
  function starPoints(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    const points = [];
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      points.push({ x, y });
      rot += step;
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      points.push({ x, y });
      rot += step;
    }
    return points;
  }
  function drawPolygon(points: {x: number, y: number}[], color: any) {
    for (let i = 0; i < points.length; i++) {
      const start = points[i];
      const end = points[(i + 1) % points.length];
      page.drawLine({ start, end, thickness: 3, color });
    }
    // Fill: draw lines with low opacity inside
    for (let i = 0; i < 10; i++) {
      const t = i / 10;
      const a = points[0];
      const b = points[1];
      const c = points[2];
      const ab = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      const ac = { x: a.x + (c.x - a.x) * t, y: a.y + (c.y - a.y) * t };
      page.drawLine({ start: ab, end: ac, thickness: 1, color, opacity: 0.2 });
    }
  }
  const star = starPoints(medalCenterX, medalCenterY, 5, 28, 12);
  drawPolygon(star, rgb(1, 1, 1));

  // Subtle geometric background designs (behind all content)
  // Large semi-transparent circles
  page.drawEllipse({
    x: 300,
    y: pageHeight - 200,
    xScale: 120,
    yScale: 120,
    color: rgb(0.85, 0.65, 0.13),
    opacity: 0.08,
  });
  page.drawEllipse({
    x: pageWidth - 250,
    y: 250,
    xScale: 90,
    yScale: 90,
    color: rgb(0.13, 0.25, 0.45),
    opacity: 0.09,
  });
  // Diagonal lines
  for (let i = 0; i < 4; i++) {
    page.drawLine({
      start: { x: 80 + i * 60, y: pageHeight - 80 },
      end: { x: 400 + i * 60, y: 80 },
      thickness: 3,
      color: rgb(0.13, 0.25, 0.45),
      opacity: 0.06,
    });
    page.drawLine({
      start: { x: pageWidth - (80 + i * 60), y: pageHeight - 80 },
      end: { x: pageWidth - (400 + i * 60), y: 80 },
      thickness: 3,
      color: rgb(0.85, 0.65, 0.13),
      opacity: 0.06,
    });
  }

  // Date of issue (left side)
  const dateLabel = `Date of Issue: ${dateStr}`;
  const dateFontSize = 18;
  const dateWidth = fontReg.widthOfTextAtSize(dateLabel, dateFontSize);
  const dateX = 80; // left margin
  const dateY = 170;
  page.drawText(dateLabel, {
    x: dateX,
    y: dateY,
    size: dateFontSize,
    font: fontReg,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Instructor signature line and label (right side, label centered under line)
  const signLine = '_________________________';
  const signFontSize = 20;
  const signWidth = fontReg.widthOfTextAtSize(signLine, signFontSize);
  const signLineX = pageWidth - signWidth - 80; // right margin
  const signLineY = 170;
  page.drawText(signLine, {
    x: signLineX,
    y: signLineY,
    size: signFontSize,
    font: fontReg,
    color: rgb(0.2, 0.2, 0.2),
  });
  const signLabel = 'Instructor Signature';
  const signLabelFontSize = 14;
  const signLabelWidth = fontReg.widthOfTextAtSize(signLabel, signLabelFontSize);
  // Center the label under the signature line
  const signLabelX = signLineX + (signWidth - signLabelWidth) / 2;
  page.drawText(signLabel, {
    x: signLabelX,
    y: signLineY - 20,
    size: signLabelFontSize,
    font: fontReg,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Gyanbridge contact info at bottom
  const contact = 'Gyanbridge | support@gyanbridge.in | +91 91370 23462';
  const contactFontSize = 14;
  const contactWidth = fontReg.widthOfTextAtSize(contact, contactFontSize);
  page.drawText(contact, {
    x: (pageWidth - contactWidth) / 2,
    y: 60,
    size: contactFontSize,
    font: fontReg,
    color: rgb(0.13, 0.25, 0.45),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="certificate.pdf"`);
  res.status(200).send(Buffer.from(pdfBytes));
} 