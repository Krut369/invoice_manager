import { useDocumentDemo } from "./useDocumentDemo";
import { DocumentNavigator } from "./DocumentNavigator";
import { DocumentViewer } from "./DocumentViewer";
import { ExtractionPanel } from "./ExtractionPanel";
import { SuccessMessage } from "./SuccessMessage";
import { EmptyDocumentState } from "./EmptyDocumentState";
import { initialExtractedFields, lineItems, clauses } from "./data";
import { Persona } from "./types";

interface DocumentDemoProps {
  persona: Persona;
}

export function DocumentDemo({ persona }: DocumentDemoProps) {
  const {
    selectedDoc,
    docs,
    currentPage,
    setCurrentPage,
    zoom,
    setZoom,
    hoveredField,
    setHoveredField,
    editingField,
    setEditingField,
    tags,
    displayFields,
    displayLineItems,
    fileInputRef,
    handleDocSelect,
    handleNextPage,
    handlePrevPage,
    handleTagToggle,
    handleExport,
    handleFileUpload,
    handleFileChange,
    handleApprove,
    handleDocDelete,
    resetSampleDocs,
    showSuccess,
    setShowSuccess
  } = useDocumentDemo();

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full animate-fade-in">
      <DocumentNavigator
        docs={docs}
        selectedDoc={selectedDoc}
        onDocSelect={handleDocSelect}
        onDocDelete={handleDocDelete}
        onFileUpload={handleFileUpload}
        onFileChange={handleFileChange}
        onResetSamples={resetSampleDocs}
        fileInputRef={fileInputRef}
      />

      {docs.length > 0 ? (
        <>
          <DocumentViewer
            selectedDoc={selectedDoc}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            zoom={zoom}
            onZoomChange={setZoom}
            extractedFields={displayFields}
            lineItems={displayLineItems}
            hoveredField={hoveredField}
            onFieldHover={setHoveredField}
          />

          <ExtractionPanel
            selectedDoc={selectedDoc}
            extractedFields={displayFields}
            lineItems={displayLineItems}
            tags={tags}
            clauses={clauses}
            hoveredField={hoveredField}
            onFieldHover={setHoveredField}
            editingField={editingField}
            onEditField={setEditingField}
            onTagToggle={handleTagToggle}
            onExport={handleExport}
            onApprove={handleApprove}
          />
        </>
      ) : (
        <EmptyDocumentState onFileUpload={handleFileUpload} />
      )}
      <SuccessMessage
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        docName={selectedDoc?.name || ""}
      />
    </div>
  );
}
