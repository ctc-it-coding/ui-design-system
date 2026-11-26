import { CodeSnippet, type CodeSnippetColor, type CodeSnippetTheme } from '../../src/components/code-snippet';
import { Section, Row } from '../ui';

const code = `// Imports
import mongoose, { Schema } from 'untitled'

// Collection name
export const collection = 'Product'

// Schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true })

// Model
export default mongoose.model(collection, schema, collection)`;

const variants: [CodeSnippetColor, CodeSnippetTheme][] = [
  ['gray', 'dark'],
  ['gray', 'light'],
  ['primary', 'dark'],
  ['primary', 'light'],
];

export default function CodeSnippetsDemo() {
  return (
    <Section id="code-snippets" title="Code snippets" figma="Code snippets/Code snippet">
      <Row label="color × theme" className="grid grid-cols-2 gap-6">
        {variants.map(([c, t]) => (
          <CodeSnippet key={c + t} color={c} theme={t} code={code.split('\n').slice(0, 9).join('\n')} />
        ))}
      </Row>
      <Row label="with tabs header / filename / no line numbers" className="grid grid-cols-2 items-start gap-6">
        <CodeSnippet
          tabs={[
            { label: 'product.ts', code },
            { label: 'install.sh', code: 'npm install @tinicorn/ui\nnpm run dev' },
          ]}
        />
        <div className="flex flex-col gap-6">
          <CodeSnippet theme="light" filename="install.sh" code={'npm install @tinicorn/ui'} />
          <CodeSnippet color="primary" theme="light" lineNumbers={false} code={'npm install @tinicorn/ui'} />
        </div>
      </Row>
    </Section>
  );
}
