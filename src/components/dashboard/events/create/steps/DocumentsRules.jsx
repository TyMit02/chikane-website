import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Upload, Trash2, AlertCircle, 
  File, Download, Eye, X, Plus,
  FileCheck, Map, Shield, Wrench
} from 'lucide-react';

const DocumentsRules = ({ data, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [uploadType, setUploadType] = useState(null);

  const documentTypes = [
    { 
      id: 'supplementaryRules', 
      label: 'Supplementary Rules',
      icon: FileText,
      description: 'Additional event rules and regulations',
      acceptedTypes: '.pdf,.doc,.docx'
    },
    { 
      id: 'trackMaps', 
      label: 'Track Maps',
      icon: Map,
      description: 'Track layouts and configuration maps',
      acceptedTypes: '.pdf,.jpg,.png'
    },
    { 
      id: 'waivers', 
      label: 'Waivers',
      icon: Shield,
      description: 'Liability waivers and release forms',
      acceptedTypes: '.pdf,.doc,.docx'
    },
    { 
      id: 'techForms', 
      label: 'Tech Forms',
      icon: Wrench,
      description: 'Technical inspection forms',
      acceptedTypes: '.pdf,.doc,.docx'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (data.waivers.length === 0) {
      newErrors.waivers = 'At least one waiver document is required';
    }

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  const handleFileUpload = (type, files) => {
    // In a real app, you'd handle file upload to a server here
    const uploadedFiles = Array.from(files).map(file => ({
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file) // Temporary URL for preview
    }));

    onUpdate({
      ...data,
      [type]: [...data[type], ...uploadedFiles]
    });
  };

  const handleDeleteDocument = (type, documentId) => {
    onUpdate({
      ...data,
      [type]: data[type].filter(doc => doc.id !== documentId)
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Documents & Rules</h2>
            <p className="mt-1 text-sm text-gray-500">
              Upload event documents, waivers, and technical forms
            </p>
          </div>
        </div>
      </div>

      {/* Document Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTypes.map(type => {
          const documents = data[type.id] || [];
          const Icon = type.icon;
          
          return (
            <div key={type.id} className="bg-white rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{type.label}</h3>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </div>
              </div>

              {/* Document List */}
              <div className="space-y-3">
                {documents.map(doc => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
                  >
                    <div className="flex items-center space-x-3">
                      <File className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => window.open(doc.url, '_blank')}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(type.id, doc.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Upload Button */}
                <label className="block">
                  <input
                    type="file"
                    accept={type.acceptedTypes}
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(type.id, e.target.files)}
                  />
                  <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-accent/50 transition-colors">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {documents.length === 0 ? (
                          <>Drop or click to upload {type.label.toLowerCase()}</>
                        ) : (
                          <>Upload additional {type.label.toLowerCase()}</>
                        )}
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation Errors */}
      {errors.waivers && (
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errors.waivers}
          </p>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <div className="space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default DocumentsRules;