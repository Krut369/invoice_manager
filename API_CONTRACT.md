# `icr-simple` API Contract

This document outlines the API contract for the `icr-simple` extraction service.

## Endpoint: Extract Invoice Data

Extracts structured data from an uploaded invoice image or PDF file.

- **URL:** `/extract`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`

### Request Parameters

| Parameter | Type | Required | Description                                                              |
| :-------- | :--- | :------- | :----------------------------------------------------------------------- |
| `file`    | File | Yes      | The invoice document to process. Supported formats: PDF, PNG, JPG, JPEG. |

### Sample Request (cURL)

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/extract' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@Alserkal.pdf;type=application/pdf'
```

### Response Attributes

The response is a JSON object with the following top-level properties:

| Field               | Type       | Description                                                                    |
| :------------------ | :--------- | :----------------------------------------------------------------------------- |
| `responseCode`      | Integer    | HTTP style status code representing the outcome of the extraction (e.g., 200). |
| `responseMessage`   | String     | A descriptive message regarding the extraction outcome.                        |
| `data`              | Object     | The extracted hierarchical invoice data.                                       |
| `usage`             | Object     | Token usage and processing cost details from the LLM.                          |
| `dataList`          | Array      | Reserved for future list data; currently empty.                                |
| `excelDataList`     | Null/Array | Reserved for future Excel data.                                                |
| `totalRecords`      | Integer    | Number of total records (default 0).                                           |
| `pageRecords`       | Integer    | Number of records on current page (default 0).                                 |
| `currentPageNumber` | Integer    | Current pagination page (default 1).                                           |
| `totalPages`        | Integer    | Total pagination pages (default 1).                                            |

#### The `data` Object

Contains the core extracted entities:

- `invoice_details`: Document-level metadata (number, dates, PO number, payment terms).
- `vendor_details`: Information about the supplier.
- `customer_details`: Information about the buyer.
- `amount_details`: Totals, taxes, currency, and banking details.
- `items`: An array of line items extracted from the invoice.

### Sample Response Output

```json
{
  "responseCode": 200,
  "responseMessage": "Extraction successful",
  "data": {
    "invoice_details": {
      "invoice_number": "1112GINV1061484",
      "invoice_date": "31/12/2023",
      "due_date": "30/01/2024",
      "payment_terms": "Net 30 Days",
      "purchase_order_number": "61002052"
    },
    "vendor_details": {
      "vendor_name": "Blue Master Cleaning Services LLC",
      "vendor_address": "PO Box # 21333, Al Ittihad Street, Al Serkal Building, 3rd Floor, 301, Dubai, United Arab Emirates",
      "vendor_gstin": null
    },
    "customer_details": {
      "customer_name": "Emirates Fast Food Company - WLL",
      "customer_address": "201, Faya Business Park, Behind Buheirah Corniche, Al Majaz 3, Sharjah, United Arab Emirates",
      "customer_gstin": null,
      "customer_account_number": "65725537"
    },
    "amount_details": {
      "tax_amount": "189.00",
      "total_amount": "3,969.00",
      "currency": "AED",
      "bank_acc_no": "1000066239",
      "iban": "AE27023000001000492239"
    },
    "items": [
      {
        "item_code": "1310012907/1310013540",
        "item_name": "GREASE Trap Cleaning Services-Type ASG 1 at McDonald's (1840015), Ajman City Centre, Ajman",
        "item_description": "GREASE Trap Cleaning Services-Type ASG 1 at McDonald's (1840015), Ajman City Centre, Ajman",
        "item_rate": "80.00",
        "item_uom": "Srv",
        "quantity": "2.00",
        "item_tax_code": "5%",
        "item_tax": "8.00",
        "item_total_amount": "160.00",
        "item_discount_type": null,
        "item_discount": null,
        "item_category": null,
        "item_weight": null,
        "item_dimensions": null,
        "item_expiry": null,
        "item_batch_number": null,
        "item_serial_number": null
      },
      {
        "item_code": "1310012907",
        "item_name": "Grease Eradication Tabs - Micro at McDonald's (1840015), Ajman City Centre, Ajman",
        "item_description": "Grease Eradication Tabs - Micro at McDonald's (1840015), Ajman City Centre, Ajman",
        "item_rate": "50.00",
        "item_uom": "Nos",
        "quantity": "1.00",
        "item_tax_code": "5%",
        "item_tax": "2.50",
        "item_total_amount": "50.00",
        "item_discount_type": null,
        "item_discount": null,
        "item_category": null,
        "item_weight": null,
        "item_dimensions": null,
        "item_expiry": null,
        "item_batch_number": null,
        "item_serial_number": null
      }
    ]
  },
  "usage": {
    "input_tokens": 3620,
    "output_tokens": 6836,
    "total_tokens": 10456,
    "cost": 0.018176,
    "processing_time": 32.89
  },
  "dataList": [],
  "excelDataList": null,
  "totalRecords": 0,
  "pageRecords": 0,
  "currentPageNumber": 1,
  "totalPages": 1
}
```
