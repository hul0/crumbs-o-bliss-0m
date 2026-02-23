import React from 'react';
import { NextResponse } from 'next/server';
import { Page, Text, View, Document, StyleSheet, renderToStream, Image, Svg, Path } from '@react-pdf/renderer';
import { createClient } from '@/utils/supabase/server';
import details from '@/config/details.json';
import fs from 'fs';
import path from 'path';

// Brand Colors
// Primary: #164a3e (Dark Green)
// Accent: #acd038 (Light Green)
// Highlight: #fcb042 (Orange)

const styles = StyleSheet.create({
  page: { 
    padding: 0, 
    fontFamily: 'Helvetica', 
    backgroundColor: '#ffffff', 
    color: '#164a3e' 
  },
  headerBanner: {
    width: '100%',
    height: 140,
    position: 'relative',
    backgroundColor: '#164a3e',
  },
  bannerImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  headerContent: {
    position: 'absolute',
    top: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logo: {
    width: 65,
    height: 65,
    backgroundColor: '#ffffff',
    borderRadius: 32.5,
    padding: 6,
  },
  headerTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  storeName: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#ffffff',
    letterSpacing: 1,
  },
  storeSlogan: { 
    fontSize: 10, 
    color: '#acd038', 
    marginTop: 4,
    fontStyle: 'italic',
  },
  invoiceTitleWrapper: { 
    alignItems: 'flex-end',
    backgroundColor: 'rgba(22, 74, 62, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  invoiceTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    letterSpacing: 2 
  },
  invoiceSubtitle: { 
    fontSize: 12, 
    color: '#fcb042',
    marginTop: 4,
  },
  svgDecorationTop: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 30,
  },
  mainContent: {
    padding: 40,
    paddingTop: 30,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoBlock: {
    width: '45%',
  },
  infoLabel: {
    fontSize: 10,
    color: '#acd038',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    paddingBottom: 4,
  },
  infoTextBold: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#164a3e',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 3,
  },
  badge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#164a3e',
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#acd038',
    textTransform: 'uppercase',
  },
  table: { 
    width: '100%', 
    marginBottom: 30 
  },
  tableHeader: { 
    flexDirection: 'row', 
    backgroundColor: '#164a3e', 
    padding: 12, 
    borderRadius: 6,
    marginBottom: 4,
  },
  tableHeaderItem: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    textTransform: 'uppercase' 
  },
  tableRow: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ebebeb', 
    padding: 12,
  },
  tableRowAlternate: {
    backgroundColor: '#f9fafb',
  },
  col1: { width: '45%' },
  col2: { width: '15%', textAlign: 'center' },
  col3: { width: '20%', textAlign: 'right' },
  col4: { width: '20%', textAlign: 'right' },
  tableCell: { fontSize: 10, color: '#164a3e' },
  tableCellBold: { fontSize: 10, fontWeight: 'bold', color: '#164a3e' },
  summaryContainer: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  summaryBox: { 
    width: '55%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  summaryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 5,
  },
  summaryLabel: { fontSize: 11, color: '#4b5563' },
  summaryValue: { fontSize: 11, fontWeight: 'bold', color: '#164a3e' },
  summaryDivider: {
    height: 1,
    backgroundColor: '#ebebeb',
    marginVertical: 6,
  },
  grandTotalRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 4,
  },
  grandTotalLabel: { fontSize: 14, fontWeight: 'bold', color: '#164a3e' },
  grandTotalValue: { fontSize: 16, fontWeight: 'bold', color: '#fcb042' },
  companyInfoContainer: { 
    marginTop: 40, 
    borderTopWidth: 1, 
    borderTopColor: '#ebebeb', 
    paddingTop: 15 
  },
  companyInfoTitle: { 
    fontSize: 10, 
    color: '#164a3e', 
    fontWeight: 'bold', 
    marginBottom: 6,
    textTransform: 'uppercase'
  },
  footerDecoration: { 
    position: 'absolute', 
    bottom: 50, 
    left: 0, 
    right: 0, 
    height: 30 
  },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: 50,
    backgroundColor: '#164a3e',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: { 
    fontSize: 10, 
    color: '#ffffff',
  },
  footerHighlight: {
    color: '#fcb042',
    fontWeight: 'bold',
  }
});

const InvoiceDocument = ({ order, invoiceDate, iconBase64, bannerBase64 }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        {bannerBase64 ? (
          <Image src={bannerBase64} style={styles.bannerImage} />
        ) : (
          <View style={{...styles.bannerImage, backgroundColor: '#164a3e'}} />
        )}
        
        {/* Header Content Overlay */}
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            {iconBase64 && (
               <Image src={iconBase64} style={styles.logo} />
            )}
            <View style={styles.headerTextContainer}>
              <Text style={styles.storeName}>{details.store.name}</Text>
              <Text style={styles.storeSlogan}>{details.store.slogan}</Text>
            </View>
          </View>
          <View style={styles.invoiceTitleWrapper}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceSubtitle}>#{order.ticket_id}</Text>
          </View>
        </View>

        {/* Decorative Wave at bottom of banner */}
        <View style={styles.svgDecorationTop}>
          <Svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <Path
              fill="#ffffff"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </Svg>
        </View>
      </View>

      <View style={styles.mainContent}>
        
        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Billed To</Text>
            <Text style={styles.infoTextBold}>{order.user_name || 'Guest Customer'}</Text>
            <Text style={styles.infoText}>{order.user_phone}</Text>
            {order.delivery_address && (
               <Text style={styles.infoText}>{order.delivery_address}</Text>
            )}
            {!order.delivery_address && (
               <Text style={styles.infoText}>In-Store / Pickup</Text>
            )}
          </View>
          
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Order Details</Text>
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Invoice Date:</Text> {invoiceDate}</Text>
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Ticket ID:</Text> {order.ticket_id}</Text>
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Order Status:</Text> {order.status}</Text>
            {order.admin_notes && (
               <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Notes:</Text> {order.admin_notes}</Text>
            )}
            
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{order.status}</Text>
            </View>
          </View>
        </View>

        {/* Table Section */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderItem, styles.col1]}>Item Description</Text>
            <Text style={[styles.tableHeaderItem, styles.col2]}>Qty</Text>
            <Text style={[styles.tableHeaderItem, styles.col3]}>Unit Price</Text>
            <Text style={[styles.tableHeaderItem, styles.col4]}>Total</Text>
          </View>
          
          {order.order_items?.map((item: any, i: number) => (
            <View style={[styles.tableRow, i % 2 !== 0 ? styles.tableRowAlternate : {}]} key={i}>
              <Text style={[styles.tableCell, styles.col1]}>{item.product_name || 'Item'}</Text>
              <Text style={[styles.tableCellBold, styles.col2]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, styles.col3]}>₹ {item.price_at_time}</Text>
              <Text style={[styles.tableCellBold, styles.col4]}>₹ {(item.quantity * item.price_at_time).toFixed(2)}</Text>
            </View>
          ))}
          
          {(!order.order_items || order.order_items.length === 0) && (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>No items found for this order.</Text>
            </View>
          )}
        </View>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹ {order.total_amount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>₹ 0.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxes</Text>
              <Text style={styles.summaryValue}>₹ 0.00</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Grand Total</Text>
              <Text style={styles.grandTotalValue}>₹ {order.total_amount}</Text>
            </View>
          </View>
        </View>
        
        {/* Company Info */}
        <View style={styles.companyInfoContainer}>
          <Text style={styles.companyInfoTitle}>Company Information</Text>
          <Text style={styles.infoText}>{details.store.name}</Text>
          <Text style={styles.infoText}>{details.location.address}, {details.location.city}, {details.location.postalCode}</Text>
          <Text style={styles.infoText}>Email: {details.contact.email} | Phone: {details.contact.primaryPhone}</Text>
          {details.social && details.social.instagram && (
            <Text style={styles.infoText}>Instagram: {details.social.instagram}</Text>
          )}
        </View>

      </View>

      {/* Footer SVG Decoration */}
      <View style={styles.footerDecoration}>
          <Svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <Path
              fill="#164a3e"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </Svg>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for your business. <Text style={styles.footerHighlight}>Let's bliss together!</Text></Text>
      </View>
      
    </Page>
  </Document>
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('ticket_id');

  if (!ticketId) {
    return NextResponse.json({ error: 'Missing ticket_id' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('ticket_id', ticketId)
    .single();

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const invoiceDate = new Date(order.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  // Convert local images to base64 for React-PDF
  let iconBase64 = undefined;
  let bannerBase64 = undefined;

  try {
    const iconPath = path.join(process.cwd(), 'public', 'icon.png');
    if (fs.existsSync(iconPath)) {
      iconBase64 = `data:image/png;base64,${fs.readFileSync(iconPath).toString('base64')}`;
    }
  } catch (e) {
    console.warn('Could not load icon.png for PDF');
  }

  try {
    const bannerPath = path.join(process.cwd(), 'public', 'banner.webp');
    if (fs.existsSync(bannerPath)) {
      bannerBase64 = `data:image/webp;base64,${fs.readFileSync(bannerPath).toString('base64')}`;
    }
  } catch (e) {
    console.warn('Could not load banner.webp for PDF');
  }

  try {
    const stream = await renderToStream(
      <InvoiceDocument 
        order={order} 
        invoiceDate={invoiceDate} 
        iconBase64={iconBase64} 
        bannerBase64={bannerBase64} 
      />
    );

    // Consume the NodeJS stream into a Buffer
    const chunks: any[] = [];
    for await (const chunk of stream as any) {
      chunks.push(Buffer.from(chunk));
    }
    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice-${order.ticket_id}.pdf"`
      },
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
