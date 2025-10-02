import docx
import PyPDF2
from io import BytesIO

def extract_text_from_docx(file: BytesIO) -> str:
    doc = docx.Document(file)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_text_from_pdf(file: BytesIO) -> str:
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text(file: BytesIO, mime_type: str) -> str:
    if mime_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return extract_text_from_docx(file)
    elif mime_type == "application/pdf":
        return extract_text_from_pdf(file)
    else:
        return "Unsupported file type"
