import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Paper, 
  IconButton, 
  Tooltip
} from '@mui/material';
import { 
  Print as PrintIcon, 
  Download as DownloadIcon 
} from '@mui/icons-material';

interface DocViewerProps {
  fileUrl: string;
  onContentTransform?: (content: string) => string;
  className?: string;
  style?: React.CSSProperties;
}

const DocViewer: React.FC<DocViewerProps> = ({ 
  fileUrl, 
  onContentTransform,
  className 

}) => {
  const [docContent, setDocContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDocx = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();

      const result = await mammoth.convertToHtml({ arrayBuffer });
      
      // Custom transformation to handle header formatting
      const transformedContent = onContentTransform 
        ? onContentTransform(result.value)
        : result.value;

      // Additional header formatting for centered content
      const formattedContent = transformedContent.replace(
        /(<p>)(\*\*CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\*\*<\/p>)(\s*<p>)(\*\*Độc lập - Tự do - Hạnh phúc\*\*<\/p>)(\s*<p>)(13\/12\/2024)(<\/p>)(\s*<p>)(\*\*ĐƠN XIN NGHỈ ỐM ĐAU\*\*<\/p>)/,
        `$1<strong style="display: block; text-align: center; font-weight: bold;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
         $3<strong style="display: block; text-align: center; font-weight: bold;">Độc lập - Tự do - Hạnh phúc</strong>
         $5<div style="text-align: center; font-weight: bold;">13/12/2024</div>
         $7<strong style="text-align: center; font-weight: bold;">ĐƠN XIN NGHỈ ỐM ĐAU</strong>`
      )
      .replace(
        /<table>/g,
        '<table style="width: 567px; text-align: center; margin: 0 auto;" cellpadding="5" class="styled-table">'
      );

      setDocContent(formattedContent);
      setIsLoading(false);
    } catch (err) {
      console.error("Error converting DOCX: ", err);
      setError("Could not load the document");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocx(fileUrl);
  }, [fileUrl, onContentTransform]);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=500, width=500');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print Document</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body { 
          font-family: 'Roboto', sans-serif; 
          line-height: 1.6; 
          max-width: 500px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        img { max-width: 90%; height: auto; }
      `);
      printWindow.document.write('</style></head><body>');
      printWindow.document.write(docContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownload = () => {
    const blob = new Blob([docContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.html';
    link.click();
  };

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="300px"
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading document...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          bgcolor: 'error.light', 
          color: 'error.contrastText' 
        }}
      >
        {error}
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        position: 'relative', 
        p: 3, 
        borderRadius: 2,
        width: '95%',
        height: '100%',
      }}
      className={className}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          display: 'flex', 
          gap: 1 
        }}
      >
        <Tooltip title="Print Document">
          <IconButton onClick={handlePrint} color="primary">
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download Document">
          <IconButton onClick={handleDownload} color="primary">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box 
        sx={{ 
          '& img': { 
            maxWidth: '93%', 
            height: 'auto' 
          } 
        }}
        dangerouslySetInnerHTML={{ __html: docContent }} 
      />
    </Paper>
  );
};

export default DocViewer;
