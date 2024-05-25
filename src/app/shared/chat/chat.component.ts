import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { IChatMessage, ISharedChatComponentProps } from '@core';
import { EChatSender } from 'app/core/enums';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-shared-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedPetChatComponent implements OnDestroy {
  public petName: string = 'Your Pet';
  public isCollapsed: boolean = false;
  public messages: IChatMessage[] = [];
  public userMessage: string = '';
  public EChatSender = EChatSender;

  private props$: Subject<ISharedChatComponentProps> =
    new Subject<ISharedChatComponentProps>();
  private destroy$: Subject<void> = new Subject<void>();

  set props(v: ISharedChatComponentProps | null) {
    if (!v) return;
    this.props$.next(v);
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private chatService: ChatService
  ) {
    this.props$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.petName = response.petName;
      this.cdr.detectChanges();
    });
  }

  toggleChat(isOpen: boolean) {
    this.isCollapsed = !isOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({
        message: this.userMessage,
        sender: EChatSender.User,
      });
      this.chatService.sendMessage(this.userMessage.trim()).subscribe(resp => {
        this.messages.push({ message: resp, sender: EChatSender.Bot });
      });
      this.userMessage = '';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
