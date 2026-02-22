"use client"

import {
  Bold,
  Italic,
  Underline,
  Quote,
  Code,
  List,
  ListOrdered,
  IndentDecrease,
  IndentIncrease,
  RemoveFormatting,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RichTextEditorProps {
  compact?: boolean
}

export default function RichTextEditor({ compact = false }: RichTextEditorProps) {
  return (
    <div className="bg-white border border-[#e8e8e8] rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-[#e8e8e8] bg-[#f9f9f9] flex-wrap">
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <Bold size={16} className="text-[#595959]" />
        </button>
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <Italic size={16} className="text-[#595959]" />
        </button>
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <Underline size={16} className="text-[#595959]" />
        </button>
        <div className="w-px h-5 bg-[#d1d1d1] mx-1" />
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <Quote size={16} className="text-[#595959]" />
        </button>
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <Code size={16} className="text-[#595959]" />
        </button>
        <div className="w-px h-5 bg-[#d1d1d1] mx-1" />
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded text-sm font-medium text-[#595959]">
          H<sub>1</sub>
        </button>
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded text-sm font-medium text-[#595959]">
          H<sub>2</sub>
        </button>
        <div className="w-px h-5 bg-[#d1d1d1] mx-1" />
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <ListOrdered size={16} className="text-[#595959]" />
        </button>
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <List size={16} className="text-[#595959]" />
        </button>
        <div className="w-px h-5 bg-[#d1d1d1] mx-1" />
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <IndentDecrease size={16} className="text-[#595959]" />
        </button>
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <IndentIncrease size={16} className="text-[#595959]" />
        </button>
        <div className="w-px h-5 bg-[#d1d1d1] mx-1" />
        <Select defaultValue="normal">
          <SelectTrigger className="h-7 w-20 text-xs border-0 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="heading">Heading</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="normal2">
          <SelectTrigger className="h-7 w-20 text-xs border-0 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal2">Normal</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-px h-5 bg-[#d1d1d1] mx-1" />
        <button className="p-1.5 hover:bg-[#e8e8e8] rounded">
          <RemoveFormatting size={16} className="text-[#595959]" />
        </button>
      </div>

      {/* Editor Area */}
      <div
        className={`p-4 ${compact ? "min-h-[100px]" : "min-h-[150px]"}`}
        contentEditable
        suppressContentEditableWarning
      />
    </div>
  )
}
