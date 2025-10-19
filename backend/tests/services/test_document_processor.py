import pytest
from unittest.mock import patch, MagicMock
from io import BytesIO
from services.document_processor import extract_text

@patch('services.document_processor.extract_text_from_docx')
def test_extract_text_docx(mock_extract_docx):
    mock_extract_docx.return_value = "docx text"
    file = BytesIO(b"dummy docx content")
    text = extract_text(file, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    assert text == "docx text"
    mock_extract_docx.assert_called_once_with(file)

@patch('services.document_processor.extract_text_from_pdf')
def test_extract_text_pdf(mock_extract_pdf):
    mock_extract_pdf.return_value = "pdf text"
    file = BytesIO(b"dummy pdf content")
    text = extract_text(file, "application/pdf")
    assert text == "pdf text"
    mock_extract_pdf.assert_called_once_with(file)

def test_extract_text_unsupported():
    file = BytesIO(b"dummy content")
    text = extract_text(file, "text/plain")
    assert text == "Unsupported file type"
