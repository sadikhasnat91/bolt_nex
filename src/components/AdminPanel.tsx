import { useEffect, useState } from 'react';
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  Upload,
  ChevronUp,
  ChevronDown,
  Settings,
  Database,
  ShieldCheck,
  Folder,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
} from 'lucide-react';
import {
  COLLECTIONS,
  SETTINGS,
  ICON_NAMES,
  type CollectionDef,
  type SettingsDef,
  type FieldDef,
} from '@/content/manifest';
import {
  login,
  logout,
  me,
  getContent,
  createContentItem,
  updateContentItem,
  deleteContentItem,
  reorderContent,
  getSettings,
  updateSettings,
  uploadImage,
} from '@/lib/api';

export function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active view state
  const [activeTab, setActiveTab] = useState<'collections' | 'settings'>('collections');
  const [selectedCollectionKey, setSelectedCollectionKey] = useState<string>(COLLECTIONS[0].key);
  const [selectedSettingsKey, setSelectedSettingsKey] = useState<string>(SETTINGS[0].key);

  // Data states
  const [collectionItems, setCollectionItems] = useState<(Record<string, unknown> & { id: string })[]>([]);
  const [settingsData, setSettingsData] = useState<Record<string, unknown>>({});
  const [editingItem, setEditingItem] = useState<(Record<string, unknown> & { id?: string }) | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Check auth status & URL on mount
  useEffect(() => {
    if (window.location.pathname.includes('/admin') || window.location.hash.includes('admin')) {
      setOpen(true);
    }
    me()
      .then((res) => {
        setAdminUser(res.username);
      })
      .catch(() => {
        setAdminUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch active collection items
  const loadCollectionItems = (key: string) => {
    getContent<Record<string, unknown>>(key)
      .then((data) => setCollectionItems(data))
      .catch((err) => showStatus(`Failed to load collection: ${err.message}`, true));
  };

  // Fetch active settings data
  const loadSettingsData = (key: string) => {
    getSettings<Record<string, unknown>>(key)
      .then((data) => setSettingsData(data ?? {}))
      .catch((err) => showStatus(`Failed to load settings: ${err.message}`, true));
  };

  useEffect(() => {
    if (!adminUser || !open) return;
    if (activeTab === 'collections') {
      loadCollectionItems(selectedCollectionKey);
    } else {
      loadSettingsData(selectedSettingsKey);
    }
  }, [adminUser, open, activeTab, selectedCollectionKey, selectedSettingsKey]);

  const showStatus = (msg: string, isError = false) => {
    setStatusMessage(`${isError ? '❌ ' : '✅ '}${msg}`);
    setTimeout(() => setStatusMessage(''), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    try {
      const res = await login(username, password);
      setAdminUser(res.username);
      showStatus('Logged in successfully!');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid username or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAdminUser(null);
      setOpen(false);
    } catch (err: any) {
      showStatus(err.message, true);
    }
  };

  const currentCollection = COLLECTIONS.find((c) => c.key === selectedCollectionKey) as CollectionDef;
  const currentSettings = SETTINGS.find((s) => s.key === selectedSettingsKey) as SettingsDef;

  const handleSaveCollectionItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      if (isNewItem) {
        await createContentItem(selectedCollectionKey, editingItem);
        showStatus('Item created!');
      } else if (editingItem.id) {
        await updateContentItem(selectedCollectionKey, editingItem.id, editingItem);
        showStatus('Item updated!');
      }
      setEditingItem(null);
      loadCollectionItems(selectedCollectionKey);
    } catch (err: any) {
      showStatus(err.message, true);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteContentItem(selectedCollectionKey, id);
      showStatus('Item deleted!');
      loadCollectionItems(selectedCollectionKey);
    } catch (err: any) {
      showStatus(err.message, true);
    }
  };

  const handleMoveItem = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= collectionItems.length) return;
    const newItems = [...collectionItems];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    setCollectionItems(newItems);
    try {
      await reorderContent(
        selectedCollectionKey,
        newItems.map((item) => item.id)
      );
      showStatus('Order updated!');
    } catch (err: any) {
      showStatus(err.message, true);
      loadCollectionItems(selectedCollectionKey);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings(selectedSettingsKey, settingsData);
      showStatus('Settings saved!');
    } catch (err: any) {
      showStatus(err.message, true);
    }
  };

  const handleFileUpload = async (
    file: File,
    onSuccess: (url: string) => void
  ) => {
    try {
      const res = await uploadImage(file);
      onSuccess(res.url);
      showStatus('Image uploaded!');
    } catch (err: any) {
      showStatus(err.message || 'Upload failed', true);
    }
  };

  return (
    <>
      {/* Floating Admin Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full border border-primary-400 bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-lift transition-all hover:scale-105 hover:bg-slate-900 active:scale-95"
      >
        <ShieldCheck className="h-4 w-4 text-primary-400" />
        {adminUser ? 'CMS Admin Panel' : 'Admin Login'}
      </button>

      {/* Modal Backdrop */}
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line bg-surface px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-ink">Nexora CMS Control Panel</h2>
                  <p className="text-xs text-muted">
                    {adminUser ? `Logged in as @${adminUser}` : 'Authentication Required'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {adminUser && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Logout
                  </button>
                )}
                <button
                  onClick={() => {
                    setOpen(false);
                    setEditingItem(null);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-slate-200 hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Status notification toast */}
            {statusMessage && (
              <div className="bg-primary-900 px-6 py-2 text-center text-xs font-semibold text-primary-100 transition-all">
                {statusMessage}
              </div>
            )}

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              {!adminUser ? (
                /* Login Form */
                <div className="mx-auto flex w-full max-w-md flex-col justify-center p-8">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-ink">Welcome back</h3>
                    <p className="mt-1 text-xs text-muted">Sign in to edit your website content & settings live.</p>
                  </div>

                  {loginError && (
                    <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-center text-xs font-semibold text-rose-600">
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="mt-6 space-y-4">
                    <label className="block text-left text-xs font-semibold text-ink-soft">
                      Username
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      />
                    </label>
                    <label className="block text-left text-xs font-semibold text-ink-soft">
                      Password
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 h-11 w-full rounded-xl bg-primary-600 font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Authenticating...' : 'Sign In'}
                    </button>
                    <p className="text-center text-[11px] text-muted">
                      Default credentials: <code className="rounded bg-slate-100 px-1 py-0.5 font-bold">admin</code> / <code className="rounded bg-slate-100 px-1 py-0.5 font-bold">admin123</code>
                    </p>
                  </form>
                </div>
              ) : (
                /* Admin Dashboard */
                <div className="flex w-full flex-col overflow-hidden sm:flex-row">
                  {/* Sidebar Navigation */}
                  <div className="w-full border-r border-line bg-surface p-4 sm:w-64">
                    <div className="flex rounded-xl bg-slate-200/60 p-1">
                      <button
                        onClick={() => {
                          setActiveTab('collections');
                          setEditingItem(null);
                        }}
                        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                          activeTab === 'collections'
                            ? 'bg-white text-ink shadow-sm'
                            : 'text-muted hover:text-ink'
                        }`}
                      >
                        <Database className="h-3.5 w-3.5" /> Collections
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('settings');
                          setEditingItem(null);
                        }}
                        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                          activeTab === 'settings'
                            ? 'bg-white text-ink shadow-sm'
                            : 'text-muted hover:text-ink'
                        }`}
                      >
                        <Settings className="h-3.5 w-3.5" /> Settings
                      </button>
                    </div>

                    <div className="mt-4 max-h-[calc(90vh-10rem)] overflow-y-auto pr-1 space-y-1">
                      {activeTab === 'collections'
                        ? COLLECTIONS.map((c) => (
                            <button
                              key={c.key}
                              onClick={() => {
                                setSelectedCollectionKey(c.key);
                                setEditingItem(null);
                              }}
                              className={`w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                                selectedCollectionKey === c.key
                                  ? 'bg-primary-50 text-primary-700 font-semibold border border-primary-200'
                                  : 'text-ink-soft hover:bg-slate-200/50'
                              }`}
                            >
                              {c.label}
                            </button>
                          ))
                        : SETTINGS.map((s) => (
                            <button
                              key={s.key}
                              onClick={() => {
                                setSelectedSettingsKey(s.key);
                                setEditingItem(null);
                              }}
                              className={`w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                                selectedSettingsKey === s.key
                                  ? 'bg-primary-50 text-primary-700 font-semibold border border-primary-200'
                                  : 'text-ink-soft hover:bg-slate-200/50'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex flex-1 flex-col overflow-y-auto p-6">
                    {activeTab === 'collections' ? (
                      <div>
                        <div className="flex items-center justify-between border-b border-line pb-4">
                          <div>
                            <h3 className="text-base font-bold text-ink">{currentCollection?.label}</h3>
                            <p className="text-xs text-muted">
                              Manage items in <code className="text-primary-700">{selectedCollectionKey}</code>
                            </p>
                          </div>
                          {!editingItem && (
                            <button
                              onClick={() => {
                                setIsNewItem(true);
                                const initial: Record<string, unknown> = {};
                                currentCollection?.fields.forEach((f) => {
                                  initial[f.key] = f.type === 'boolean' ? false : f.type === 'number' ? 0 : '';
                                });
                                setEditingItem(initial);
                              }}
                              className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-700"
                            >
                              <Plus className="h-4 w-4" /> Add Item
                            </button>
                          )}
                        </div>

                        {editingItem ? (
                          /* Edit / Create Item Form */
                          <form onSubmit={handleSaveCollectionItem} className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-ink">
                                {isNewItem ? 'New Item' : 'Edit Item'}
                              </h4>
                              <button
                                type="button"
                                onClick={() => setEditingItem(null)}
                                className="text-xs text-muted hover:text-ink"
                              >
                                Cancel
                              </button>
                            </div>

                            {currentCollection?.fields.map((field) => (
                              <RenderFieldInput
                                key={field.key}
                                field={field}
                                value={editingItem[field.key]}
                                onChange={(val) => setEditingItem({ ...editingItem, [field.key]: val })}
                                onFileUpload={handleFileUpload}
                              />
                            ))}

                            <div className="flex gap-2 pt-2">
                              <button
                                type="submit"
                                className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-700"
                              >
                                <Check className="h-4 w-4" /> Save Item
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingItem(null)}
                                className="rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:bg-slate-100"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          /* Items List */
                          <div className="mt-6 space-y-3">
                            {collectionItems.length === 0 ? (
                              <p className="py-8 text-center text-xs text-muted">No items in this collection yet.</p>
                            ) : (
                              collectionItems.map((item, idx) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm transition-all hover:border-primary-200"
                                >
                                  <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="flex flex-col gap-0.5">
                                      <button
                                        disabled={idx === 0}
                                        onClick={() => handleMoveItem(idx, 'up')}
                                        className="text-slate-400 hover:text-ink disabled:opacity-20"
                                      >
                                        <ChevronUp className="h-3.5 w-3.5" />
                                      </button>
                                      <button
                                        disabled={idx === collectionItems.length - 1}
                                        onClick={() => handleMoveItem(idx, 'down')}
                                        className="text-slate-400 hover:text-ink disabled:opacity-20"
                                      >
                                        <ChevronDown className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                    <div className="truncate">
                                      <p className="truncate text-sm font-bold text-ink">
                                        {String(item.title || item.name || item.feature || item.value || `Item #${idx + 1}`)}
                                      </p>
                                      <p className="truncate text-xs text-muted">
                                        {String(item.description || item.role || item.category || item.label || item.quote || '')}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      onClick={() => {
                                        setIsNewItem(false);
                                        setEditingItem(item);
                                      }}
                                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-ink hover:bg-slate-200"
                                    >
                                      <Edit2 className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(item.id)}
                                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-rose-600 hover:bg-rose-50"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Settings Editor */
                      <div>
                        <div className="border-b border-line pb-4">
                          <h3 className="text-base font-bold text-ink">{currentSettings?.label}</h3>
                          <p className="text-xs text-muted">Edit configuration key <code className="text-primary-700">{selectedSettingsKey}</code></p>
                        </div>

                        <form onSubmit={handleSaveSettings} className="mt-6 space-y-4">
                          {currentSettings?.fields.map((field) => (
                            <RenderFieldInput
                              key={field.key}
                              field={field}
                              value={settingsData[field.key]}
                              onChange={(val) => setSettingsData({ ...settingsData, [field.key]: val })}
                              onFileUpload={handleFileUpload}
                            />
                          ))}

                          <div className="pt-2">
                            <button
                              type="submit"
                              className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-700"
                            >
                              <Check className="h-4 w-4" /> Save Settings
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function RenderFieldInput({
  field,
  value,
  onChange,
  onFileUpload,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (val: unknown) => void;
  onFileUpload: (file: File, cb: (url: string) => void) => void;
}) {
  return (
    <label className="block text-left text-xs font-semibold text-ink-soft">
      {field.label}
      {field.type === 'textarea' ? (
        <textarea
          rows={3}
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full resize-none rounded-xl border border-line bg-white p-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      ) : field.type === 'boolean' ? (
        <div className="mt-1 flex items-center gap-2">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-line text-primary-600 focus:ring-primary-500"
          />
          <span className="text-xs font-normal text-muted">Enabled</span>
        </div>
      ) : field.type === 'number' ? (
        <input
          type="number"
          value={Number(value ?? 0)}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-1 h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      ) : field.type === 'icon' ? (
        <select
          value={String(value ?? ICON_NAMES[0])}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          {ICON_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      ) : field.type === 'image' ? (
        <ImageFieldInput value={value} onChange={onChange} onFileUpload={onFileUpload} />
      ) : field.type === 'list' ? (
        <textarea
          rows={3}
          value={Array.isArray(value) ? value.join('\n') : String(value ?? '')}
          onChange={(e) => onChange(e.target.value.split('\n'))}
          placeholder="One item per line..."
          className="mt-1 w-full resize-none rounded-xl border border-line bg-white p-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      ) : (
        <input
          type="text"
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      )}
    </label>
  );
}

// ─── Image Field with URL + Device Upload dual mode ──────────────────────────
function ImageFieldInput({
  value,
  onChange,
  onFileUpload,
}: {
  value: unknown;
  onChange: (val: unknown) => void;
  onFileUpload: (file: File, cb: (url: string) => void) => void;
}) {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [uploading, setUploading] = useState(false);
  const urlStr = String(value ?? '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    onFileUpload(file, (url) => {
      onChange(url);
      setUploading(false);
    });
  };

  return (
    <div className="mt-1 space-y-2">
      {/* Mode toggle */}
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1 w-fit">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all ${
            mode === 'url' ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'
          }`}
        >
          <LinkIcon className="h-3 w-3" /> URL
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all ${
            mode === 'upload' ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'
          }`}
        >
          <Upload className="h-3 w-3" /> Upload
        </button>
      </div>

      {mode === 'url' ? (
        <NetworkImageUrlInput value={urlStr} onChange={onChange} />
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-slate-50 p-4 transition-colors hover:border-primary-400 hover:bg-primary-50">
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
          ) : (
            <>
              <ImageIcon className="h-6 w-6 text-muted" />
              <span className="text-xs text-muted">
                Click to choose image from device
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}

// ─── Network Image URL sub-component ─────────────────────────────────────────
function NetworkImageUrlInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: unknown) => void;
}) {
  const [previewState, setPreviewState] = useState<'idle' | 'ok' | 'blocked'>('idle');

  // Reset preview state whenever the URL changes
  useEffect(() => {
    if (!value) {
      setPreviewState('idle');
      return;
    }
    setPreviewState('idle');
    const img = new Image();
    img.onload = () => setPreviewState('ok');
    img.onerror = () => setPreviewState('blocked');
    img.src = value;
  }, [value]);

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) onChange(text.trim());
    } catch {
      // clipboard API blocked — do nothing, user can type manually
    }
  };

  return (
    <div className="space-y-2">
      {/* Input row with paste button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste any image URL — Google, Facebook, Instagram, Imgur…"
          className="h-10 flex-1 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
        <button
          type="button"
          onClick={handlePasteFromClipboard}
          title="Paste image URL from clipboard"
          className="flex h-10 items-center gap-1.5 rounded-xl border border-line bg-slate-50 px-3 text-xs font-semibold text-ink-soft transition-colors hover:bg-slate-200"
        >
          <Folder className="h-3.5 w-3.5" /> Paste
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            title="Clear URL"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-rose-50 text-rose-500 transition-colors hover:bg-rose-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Hint */}
      <p className="text-[11px] text-muted leading-tight">
        Supports any public image link — Google Images, Facebook, Instagram, Unsplash, Imgur, CDN URLs, etc.
      </p>

      {/* Preview area */}
      {value && (
        <div className="rounded-xl border border-line overflow-hidden bg-slate-50">
          {previewState === 'ok' && (
            <img
              src={value}
              alt="preview"
              className="max-h-40 w-full object-contain"
            />
          )}
          {previewState === 'blocked' && (
            <div className="flex items-start gap-2 p-3">
              <ImageIcon className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <p className="text-[11px] font-semibold text-amber-700">Preview blocked by the image host</p>
                <p className="text-[11px] text-muted mt-0.5">
                  The URL is saved and will display on the site — some hosts (Facebook, Instagram) prevent in-browser preview due to CORS or authentication.
                </p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-primary-600 hover:underline"
                >
                  <LinkIcon className="h-3 w-3" /> Open image in new tab ↗
                </a>
              </div>
            </div>
          )}
          {previewState === 'idle' && value && (
            <div className="flex items-center gap-2 p-3">
              <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
              <span className="text-[11px] text-muted">Checking image…</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
