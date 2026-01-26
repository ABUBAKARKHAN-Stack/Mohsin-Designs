"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { ControlledLocalizedInput } from "./ControlledLocalizedInput";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, LocalizedString } from "@/types/form.types";

type FormEditorProps = {
    fields: FormField[];
    onChange: (fields: FormField[]) => void;
    submitButtonText: LocalizedString;
    onSubmitButtonTextChange: (text: LocalizedString) => void;
    successMessage: LocalizedString;
    onSuccessMessageChange: (message: LocalizedString) => void;
};

export function FormEditor({
    fields,
    onChange,
    submitButtonText,
    onSubmitButtonTextChange,
    successMessage,
    onSuccessMessageChange
}: FormEditorProps) {
    const [expandedField, setExpandedField] = useState<number | null>(null);

    const addField = () => {
        const newField: FormField = {
            _key: `field_${Date.now()}`,
            fieldType: "text",
            fieldName: "",
            label: { en: "", ur: "", es: "", ar: "" },
            placeholder: { en: "", ur: "", es: "", ar: "" },
            required: false
        };
        onChange([...fields, newField]);
        setExpandedField(fields.length);
    };

    const removeField = (index: number) => {
        onChange(fields.filter((_, i) => i !== index));
        if (expandedField === index) {
            setExpandedField(null);
        }
    };

    const updateField = (index: number, updates: Partial<FormField>) => {
        const updated = [...fields];
        updated[index] = { ...updated[index], ...updates };
        onChange(updated);
    };

    const fieldTypes = [
        { value: "text", label: "Text" },
        { value: "email", label: "Email" },
        { value: "tel", label: "Phone" },
        { value: "number", label: "Number" },
        { value: "textarea", label: "Textarea" },
        { value: "select", label: "Select" },
        { value: "checkbox", label: "Checkbox" },
        { value: "radio", label: "Radio" }
    ];

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Form Fields</CardTitle>
                        <Button type="button" onClick={addField} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Field
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {fields.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                            No fields added yet. Click "Add Field" to get started.
                        </p>
                    ) : (
                        fields.map((field, index) => (
                            <div key={field._key || index} className="border rounded-lg p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                                        <h4 className="font-medium">
                                            {field.label?.en || `Field ${index + 1}`}
                                        </h4>
                                        <span className="text-sm text-muted-foreground">
                                            ({field.fieldType})
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setExpandedField(expandedField === index ? null : index)}
                                        >
                                            {expandedField === index ? "Collapse" : "Expand"}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeField(index)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {expandedField === index && (
                                    <div className="space-y-4 pt-4 border-t">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Field Type</Label>
                                                <Select
                                                    value={field.fieldType}
                                                    onValueChange={(value) => updateField(index, { fieldType: value })}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {fieldTypes.map((type) => (
                                                            <SelectItem key={type.value} value={type.value}>
                                                                {type.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Field Name/ID</Label>
                                                <Input
                                                    value={field.fieldName}
                                                    onChange={(e) => updateField(index, { fieldName: e.target.value })}
                                                    placeholder="e.g., email, phone"
                                                />
                                            </div>
                                        </div>

                                        <ControlledLocalizedInput
                                            name={`field-${index}-label`}
                                            label="Label"
                                            value={field.label}
                                            onChange={(value) => updateField(index, { label: value })}
                                        />

                                        <ControlledLocalizedInput
                                            name={`field-${index}-placeholder`}
                                            label="Placeholder"
                                            value={field.placeholder}
                                            onChange={(value) => updateField(index, { placeholder: value })}
                                        />

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`required-${index}`}
                                                checked={field.required}
                                                onCheckedChange={(checked) => updateField(index, { required: checked as boolean })}
                                            />
                                            <Label htmlFor={`required-${index}`}>Required Field</Label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Form Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ControlledLocalizedInput
                        name="submitButtonText"
                        label="Submit Button Text"
                        value={submitButtonText}
                        onChange={onSubmitButtonTextChange}
                    />
                    <ControlledLocalizedInput
                        name="successMessage"
                        label="Success Message"
                        value={successMessage}
                        onChange={onSuccessMessageChange}
                        isTextarea
                    />
                </CardContent>
            </Card>
        </div>
    );
}
