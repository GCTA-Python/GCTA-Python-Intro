"""
using given methods:
    def display_board(board):

    def make_list_of_free_fields(board):

    def enter_move(board):

    def victory_for(board, sign):

    def draw_move(board):

    def run():

write a tic-tac-toe app
"""

import random


class TTTGame:
    valid_input = [str(i) for i in range(1, 10)]

    def __init__(self):
        self.board = [[j+(3*i) for j in range(1,4)] for i in range(3)]

    @staticmethod
    def num_to_index(num) -> tuple[int, int]:
        col = (num - 1) % 3
        row = (num - 1) // 3
        return row, col

    @staticmethod
    def index_to_num() -> int:
        raise NotImplementedError

    def display_board(self) -> None:
        for each_line in self.board:
            print('+---+---+---+')
            print(f'| {each_line[0]} | {each_line[1]} | {each_line[2]} |')
        else:
            print('+---+---+---+')

    # consider optimization
    def make_list_of_free_fields(self):
        free_fields = list()
        for row in self.board:
            for element in row:
                if type(element) is int:
                    free_fields.append(element)
        return free_fields

    # todo force valid input
    # todo force valid move (no overwrite)
    def enter_move(self) -> None:
        usr_inp = ''
        while usr_inp not in self.valid_input:
            usr_inp = input('Enter Move: ')
        usr_inp = int(usr_inp)

        row, col = self.num_to_index(usr_inp)
        self.board[row][col] = 'x'

    def victory_for(self, sign):
        # horizontal and vertical
        for index in range(3):
            # horizontal
            i = index
            lft = self.board[i][0]
            mid = self.board[i][1]
            rht = self.board[i][2]
            if lft == mid == rht:
                return lft == sign

            # vertical
            j = index
            top = self.board[0][j]
            mid = self.board[1][j]
            bot = self.board[2][j]
            if top == mid == bot:
                return top == sign

        # diagonals
        tl = self.board[0][0]
        mm = self.board[1][1]
        br = self.board[2][2]
        if tl == mm == br:
            return tl == sign
        tr = self.board[0][2]
        bl = self.board[2][0]
        if tr == mm == bl:
            return tr == sign

        return False

    def draw_move(self) -> None:
        free_fields = self.make_list_of_free_fields()
        random_move_num = random.choice(free_fields)
        row, col = self.num_to_index(random_move_num)
        self.board[row][col] = 'o'

    def run(self):
        self.display_board()
        while self.make_list_of_free_fields():
            self.enter_move()
            if self.victory_for('x'):
                print('Player wins!')
                self.display_board()
                break
            else:
                print('Board Updated!')
                self.display_board()

            self.draw_move()
            if self.victory_for('o'):
                print('Computer wins!')
                self.display_board()
                break
            else:
                print('Board Updated!')
                self.display_board()
        else:
            print('Tie!')


# allows importing this file
if __name__ == '__main__':
    app = TTTGame()
    app.run()
