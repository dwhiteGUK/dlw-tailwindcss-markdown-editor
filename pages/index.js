import * as React from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import useDebounce from '../hooks/useDebounce';

const defaultMarkdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.`

export default function Home() {
  const [status, setStatus] = React.useState('write');
  const [markdown, setMarkdown] = React.useState(defaultMarkdown);

  const value = useDebounce(markdown, 250);

  return (
    <div className="flex flex-col align-center justify-between h-screen bg-white">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-full m-auto py-10 px-5">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl p-10">
          Markdown Editor
        </h1>
        <div className="flex flex-col items-start">
          <nav className="flex space-x-2" aria-label="Tabs">
            <button
              type="button"
              className={`${status === 'write' ? 'bg-red-100 text-red-700' : 'text-gray-500'} hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md`}
              onClick={() => setStatus('write')}
            >
              Write
            </button>
            <button
              type="button"
              className={`${status === 'preview' ? 'bg-red-100 text-red-700' : 'text-gray-500'} hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md`}
              onClick={() => setStatus('preview')}
            >
              Preview
            </button>
          </nav>

          <div className="relative w-full h-64">
            <div className={`${status === 'write' ? 'z-10' : '-z-10'} absolute inset-0 py-1 h-full`}>
              <label htmlFor="editor" className="sr-only">Editor</label>
              <textarea
                id="editor"
                name="editor"
                className="shadow-sm focus:ring-red-500 focus:border-red-500 p-1 block w-full h-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Enter text using markdown here"
                onChange={(e) => setMarkdown(`${e.target.value}`)}
                defaultValue={value}
              />
            </div>
            <div className={`${status === 'preview' ? 'z-10' : '-z-10'} absolute inset-0 py-1 h-full`}>
              <div className="shadow-sm focus:ring-red-500 focus:border-red-500 p-1 block w-full h-full sm:text-sm border border-gray-300 rounded-md overflow-y-scroll prose">
                <ReactMarkdown plugins={[gfm]} children={value} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex justify-center align-center p-3">
        demo by dlw.dev
      </footer>
    </div>
  )
}
