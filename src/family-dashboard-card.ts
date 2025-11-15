import { LitElement, html, PropertyValues } from 'lit';
import { styles } from './styles';
import { FamilyDashboardConfig, PersonConfig, HomeAssistant } from './types';

export class FamilyDashboardCard extends LitElement {
  public hass!: HomeAssistant;
  private _config!: FamilyDashboardConfig;
  private selectedPerson: any = null;
  private dialogOpen = false;

  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object, state: true },
      selectedPerson: { type: Object, state: true },
      dialogOpen: { type: Boolean, state: true },
    };
  }

  static styles = [styles];

  static getConfigElement() {
    return document.createElement('family-dashboard-card-editor');
  }

  static getStubConfig() {
    return {
      entities: [],
      title: 'Family Dashboard',
    };
  }

  get config() {
    return this._config;
  }

  public setConfig(config: FamilyDashboardConfig): void {
    if (!config.entities || config.entities.length === 0) {
      throw new Error('You need to define entities');
    }
    this._config = config;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') || changedProps.has('_config')) {
      this.requestUpdate();
    }
  }

  private getPersonData(personConfig: PersonConfig) {
    const personEntity = this.hass.states[personConfig.person];
    if (!personEntity) return null;

    const devices = personConfig.device_trackers?.map(trackerId => {
      const tracker = this.hass.states[trackerId];
      return tracker ? {
        name: tracker.attributes.friendly_name || trackerId.split('.')[1],
        type: this.getDeviceType(trackerId),
        battery: tracker.attributes.battery_level || null,
        location: tracker.state,
      } : null;
    }).filter(Boolean) || [];

    const steps = personConfig.step_sensor 
      ? this.hass.states[personConfig.step_sensor]?.state 
      : null;
    
    const battery = personConfig.battery_sensor
      ? this.hass.states[personConfig.battery_sensor]?.state
      : devices[0]?.battery?.toString();

    const heartRate = personConfig.heart_rate_sensor
      ? this.hass.states[personConfig.heart_rate_sensor]?.state
      : null;

    return {
      id: personConfig.person,
      name: personEntity.attributes.friendly_name || personEntity.entity_id.split('.')[1],
      status: personEntity.state,
      location: personEntity.attributes.location || personEntity.state,
      battery: battery ? parseInt(battery) : null,
      steps: steps ? parseInt(steps) : null,
      lastSeen: personEntity.last_updated,
      devices,
      heartRate: heartRate ? parseInt(heartRate) : null,
      latitude: personEntity.attributes.latitude,
      longitude: personEntity.attributes.longitude,
      picture: personEntity.attributes.entity_picture,
    };
  }

  private getDeviceType(trackerId: string): string {
    const name = trackerId.toLowerCase();
    if (name.includes('iphone') || name.includes('phone')) return 'phone';
    if (name.includes('watch')) return 'watch';
    if (name.includes('tablet') || name.includes('ipad')) return 'tablet';
    return 'phone';
  }

  private getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'home': return 'var(--status-home)';
      case 'away': return 'var(--status-away)';
      case 'not_home': return 'var(--status-away)';
      default: return 'var(--muted)';
    }
  }

  private getStatusText(status: string): string {
    switch (status.toLowerCase()) {
      case 'home': return 'Hemma';
      case 'away': return 'Borta';
      case 'not_home': return 'Borta';
      default: return status;
    }
  }

  private getBatteryColor(level: number): string {
    if (level > 50) return 'var(--status-home)';
    if (level > 20) return 'var(--status-warning)';
    return 'var(--status-critical)';
  }

  private getDeviceIcon(type: string): string {
    switch (type) {
      case 'phone': return '📱';
      case 'watch': return '⌚';
      case 'tablet': return '💻';
      default: return '📱';
    }
  }

  private formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just nu';
    if (diffMins < 60) return `${diffMins} min sedan`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h sedan`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d sedan`;
  }

  private handlePersonClick(person: any) {
    this.selectedPerson = person;
    this.dialogOpen = true;
  }

  private closeDialog() {
    this.dialogOpen = false;
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<ha-card>Loading...</ha-card>`;
    }

    const people = this._config.entities
      .map(personConfig => this.getPersonData(personConfig))
      .filter(Boolean);

    return html`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${this._config.title || 'Family Dashboard'}</h2>
          <p class="description">
            ${this._config.description || 'Håll koll på var alla är och hur de mår'}
          </p>

          <div class="people-grid">
            ${people.map(person => this.renderPerson(person))}
          </div>
        </div>

        ${this.dialogOpen ? this.renderDialog() : ''}
      </ha-card>
    `;
  }

  private renderPerson(person: any) {
    return html`
      <div class="person-card" @click=${() => this.handlePersonClick(person)}>
        <div class="person-avatar">
          ${person.picture 
            ? html`<img src="${person.picture}" alt="${person.name}" />`
            : html`<div class="avatar-placeholder">${person.name[0]}</div>`
          }
        </div>
        
        <div class="person-info">
          <h3 class="person-name">${person.name}</h3>
          <span class="status-badge" style="background-color: ${this.getStatusColor(person.status)}">
            ${this.getStatusText(person.status)}
          </span>
        </div>

        <div class="person-details">
          <div class="detail-item">
            <span class="icon">📍</span>
            <span class="text">${person.location}</span>
          </div>
          
          ${person.battery !== null ? html`
            <div class="detail-item">
              <span class="icon">🔋</span>
              <span class="text" style="color: ${this.getBatteryColor(person.battery)}">
                ${person.battery}%
              </span>
            </div>
          ` : ''}
          
          ${person.steps !== null ? html`
            <div class="detail-item">
              <span class="icon">👟</span>
              <span class="text">${person.steps.toLocaleString()} steg</span>
            </div>
          ` : ''}

          <div class="detail-item">
            <span class="icon">🕐</span>
            <span class="text">${this.formatTime(person.lastSeen)}</span>
          </div>
        </div>
      </div>
    `;
  }

  private renderDialog() {
    const person = this.selectedPerson;
    if (!person) return '';

    return html`
      <div class="dialog-overlay" @click=${this.closeDialog}>
        <div class="dialog-content" @click=${(e: Event) => e.stopPropagation()}>
          <button class="dialog-close" @click=${this.closeDialog}>✕</button>
          
          <div class="dialog-header">
            <div class="dialog-avatar">
              ${person.picture 
                ? html`<img src="${person.picture}" alt="${person.name}" />`
                : html`<div class="avatar-placeholder">${person.name[0]}</div>`
              }
            </div>
            <div>
              <h2 class="dialog-name">${person.name}</h2>
              <span class="status-badge" style="background-color: ${this.getStatusColor(person.status)}">
                ${this.getStatusText(person.status)}
              </span>
            </div>
          </div>

          ${person.steps !== null || person.heartRate !== null ? html`
            <div class="dialog-section">
              <h3 class="section-title">Aktivitet</h3>
              <div class="activity-grid">
                ${person.steps !== null ? html`
                  <div class="activity-item">
                    <span class="activity-icon">👟</span>
                    <div class="activity-value">${person.steps.toLocaleString()}</div>
                    <div class="activity-label">Steg</div>
                  </div>
                ` : ''}
                ${person.heartRate !== null ? html`
                  <div class="activity-item">
                    <span class="activity-icon">❤️</span>
                    <div class="activity-value">${person.heartRate}</div>
                    <div class="activity-label">BPM</div>
                  </div>
                ` : ''}
              </div>
            </div>
          ` : ''}

          ${person.devices && person.devices.length > 0 ? html`
            <div class="dialog-section">
              <h3 class="section-title">Enheter</h3>
              <div class="devices-list">
                ${person.devices.map(device => html`
                  <div class="device-item">
                    <span class="device-icon">${this.getDeviceIcon(device.type)}</span>
                    <div class="device-info">
                      <div class="device-name">${device.name}</div>
                      <div class="device-location">${device.location}</div>
                    </div>
                    ${device.battery !== null ? html`
                      <div class="device-battery" style="color: ${this.getBatteryColor(device.battery)}">
                        ${device.battery}%
                      </div>
                    ` : ''}
                  </div>
                `)}
              </div>
            </div>
          ` : ''}

          ${person.latitude && person.longitude ? html`
            <div class="dialog-section">
              <h3 class="section-title">Position</h3>
              <div class="location-info">
                <div class="location-text">
                  📍 ${person.location}
                </div>
                <div class="coordinates">
                  ${person.latitude.toFixed(4)}, ${person.longitude.toFixed(4)}
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('family-dashboard-card', FamilyDashboardCard);

declare global {
  interface HTMLElementTagNameMap {
    'family-dashboard-card': FamilyDashboardCard;
  }
}
