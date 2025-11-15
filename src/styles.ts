import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  ha-card {
    --card-background: var(--ha-card-background, var(--card-background-color, white));
    background: var(--card-background);
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
    overflow: hidden;
  }

  .card-content {
    padding: 24px;
  }

  .title {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    color: var(--primary-text-color);
    line-height: 1.2;
  }

  .description {
    margin: 0 0 24px 0;
    font-size: 14px;
    color: var(--secondary-text-color);
    opacity: 0.8;
  }

  .people-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .person-card {
    background: var(--ha-card-background, rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(10px);
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .person-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--primary-color, rgba(255, 255, 255, 0.2));
  }

  .person-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-bottom: 16px;
    overflow: hidden;
    border: 2px solid var(--primary-color, #3b82f6);
  }

  .person-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary-color, #3b82f6), var(--accent-color, #8b5cf6));
    color: white;
    font-size: 24px;
    font-weight: 700;
  }

  .person-info {
    margin-bottom: 16px;
  }

  .person-name {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    color: white;
  }

  .person-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  .detail-item .icon {
    font-size: 16px;
    opacity: 0.8;
  }

  .detail-item .text {
    flex: 1;
  }

  /* Dialog Styles */
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .dialog-content {
    background: var(--ha-card-background, white);
    border-radius: 16px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.3s ease-out;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .dialog-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
    color: var(--primary-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.2s;
  }

  .dialog-close:hover {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    transform: scale(1.1);
  }

  .dialog-header {
    padding: 24px;
    border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .dialog-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--primary-color, #3b82f6);
    flex-shrink: 0;
  }

  .dialog-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .dialog-name {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 700;
    color: var(--primary-text-color);
  }

  .dialog-section {
    padding: 24px;
    border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
  }

  .dialog-section:last-child {
    border-bottom: none;
  }

  .section-title {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .activity-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
  }

  .activity-item {
    text-align: center;
    padding: 16px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border-radius: 12px;
  }

  .activity-icon {
    font-size: 32px;
    display: block;
    margin-bottom: 8px;
  }

  .activity-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--primary-text-color);
    margin-bottom: 4px;
  }

  .activity-label {
    font-size: 12px;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .devices-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .device-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border-radius: 8px;
  }

  .device-icon {
    font-size: 24px;
  }

  .device-info {
    flex: 1;
  }

  .device-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-text-color);
    margin-bottom: 2px;
  }

  .device-location {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .device-battery {
    font-size: 14px;
    font-weight: 600;
  }

  .location-info {
    padding: 16px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border-radius: 8px;
  }

  .location-text {
    font-size: 16px;
    color: var(--primary-text-color);
    margin-bottom: 8px;
  }

  .coordinates {
    font-size: 12px;
    color: var(--secondary-text-color);
    font-family: monospace;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .card-content {
      padding: 16px;
    }

    .people-grid {
      grid-template-columns: 1fr;
    }

    .dialog-content {
      margin: 0;
      max-height: 100vh;
      border-radius: 0;
    }
  }
`;
