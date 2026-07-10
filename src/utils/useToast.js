let toastEl = null
let timer = null

export function showToast(msg = '✓ 已复制') {
  if (timer) { clearTimeout(timer); timer = null }
  if (toastEl) { toastEl.remove(); toastEl = null }

  toastEl = document.createElement('div')
  toastEl.textContent = msg
  Object.assign(toastEl.style, {
    position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
    zIndex: '9999', background: '#2C2C2C', color: '#fff',
    padding: '10px 22px', borderRadius: '8px', fontSize: '14px',
    opacity: '0', transition: 'opacity 0.25s ease',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    pointerEvents: 'none'
  })
  document.body.appendChild(toastEl)
  requestAnimationFrame(() => { toastEl.style.opacity = '1' })
  timer = setTimeout(() => {
    toastEl.style.opacity = '0'
    setTimeout(() => { if (toastEl) { toastEl.remove(); toastEl = null } }, 300)
    timer = null
  }, 1200)
}
