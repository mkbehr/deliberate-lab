import '../../pair-components/button';
import '../../pair-components/icon_button';
import '../../pair-components/textarea';
import '../../pair-components/tooltip';

import '../participant_profile/profile_avatar';

import {MobxLitElement} from '@adobe/lit-mobx';
import {CSSResultGroup, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {core} from '../../core/core';
import {AuthService} from '../../services/auth.service';
import {ExperimentManager} from '../../services/experiment.manager';
import {RouterService} from '../../services/router.service';

import {
  LLM_AGENT_AVATARS
} from '../../shared/constants';

import {styles} from './experimenter_manual_chat.scss';

/** Experimenter manual chat interface component */
@customElement('experimenter-manual-chat')
export class Chat extends MobxLitElement {
  static override styles: CSSResultGroup = [styles];

  private readonly authService = core.getService(AuthService);
  private readonly experimentManager = core.getService(ExperimentManager);
  private readonly routerService = core.getService(RouterService);

  @state() value = '';
  @state() name = 'Agent';
  @state() avatar = '⭐';
  @state() isLoading = false;

  private async sendUserInput() {
    if (this.value.trim() === '') return;
    this.isLoading = true;

    // Send chat message
    await this.experimentManager.createManualChatMessage(
      this.routerService.activeRoute.params['stage'],
      {
        message: this.value.trim(),
        profile: { name: this.name, avatar: this.avatar, pronouns: null }
      }
    );

    this.value = '';
    this.isLoading = false;
  }

  private renderInput() {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.sendUserInput();
        e.stopPropagation();
      }
    };

    const handleInput = (e: Event) => {
      this.value = (e.target as HTMLTextAreaElement).value;
    };

    const autoFocus = () => {
      // Only auto-focus chat input if on desktop
      return navigator.maxTouchPoints === 0;
    };

    return html`<div class="input-wrapper">
      <div class="input">
        <pr-textarea
          size="small"
          placeholder="Send message"
          .value=${this.value}
          ?focused=${autoFocus()}
          ?disabled=${this.isLoading}
          @keyup=${handleKeyUp}
          @input=${handleInput}
        >
        </pr-textarea>
        <pr-tooltip
          text="Send message"
          color="tertiary"
          variant="outlined"
          position="TOP_END"
        >
          <pr-icon-button
            icon="send"
            variant="tonal"
            .disabled=${this.value.trim() === '' || this.isLoading}
            ?loading=${this.isLoading}
            @click=${this.sendUserInput}
          >
          </pr-icon-button>
        </pr-tooltip>
      </div>
    </div>`;
  }

  private renderName() {
    const updateName = (e: InputEvent) => {
      const value = (e.target as HTMLTextAreaElement).value;
      this.name = value;
    };

    return html`
      <div class="radio-question">
        <div class="title">Sender name</div>
        <pr-textarea
          placeholder="Name of sender"
          variant="outlined"
          .value=${this.name}
          ?disabled=${this.isLoading}
          @input=${updateName}
        >
        </pr-textarea>
      </div>
    `;
  }

  private renderAvatars() {
    const handleAvatarClick = (e: Event) => {
      const value = Number((e.target as HTMLInputElement).value);
      const avatar = LLM_AGENT_AVATARS[value];
      this.avatar = avatar;
    };

    const renderAvatarRadio = (emoji: string, index: number) => {
      return html`
        <div class="radio-button">
          <md-radio
            id=${emoji}
            name="manual-chat-avatar"
            value=${index}
            ?checked=${this.avatar === emoji}
            @change=${handleAvatarClick}
          >
          </md-radio>
          <profile-avatar .emoji=${emoji} .square=${true}></profile-avatar>
        </div>
      `;
    };

    return html`
      <div class="radio-question">
        <div class="title">Avatar</div>
        <div class="radio-wrapper">
          ${LLM_AGENT_AVATARS.map(
            (avatar, index) => renderAvatarRadio(avatar, index)
          )}
        </div>
      </div>
    `;
  }

  override render() {
    if (!this.authService.isExperimenter) return nothing;

    const stageId = this.routerService.activeRoute.params['stage'];

    return html`
      ${this.renderName()}
      ${this.renderAvatars()}
      <div class="input-row-wrapper">
        <div class="input-row">${this.renderInput()}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'experimenter-manual-chat': Chat;
  }
}